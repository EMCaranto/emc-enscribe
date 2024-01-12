// Convex
import { v } from 'convex/values'

import { Doc, Id } from './_generated/dataModel'
import { mutation, query } from './_generated/server'

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id('documents')),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Unauthenticated')
    }

    const userId = identity.subject

    const document = await ctx.db.insert('documents', {
      title: args.title,
      userId: userId,
      parentDocument: args.parentDocument,
      isPublished: false,
      isArchived: false,
    })

    return document
  },
})

export const getArchivedDocument = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Unauthenticated')
    }

    const userId = identity.subject

    const document = await ctx.db
      .query('documents')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .filter((q) => q.eq(q.field('isArchived'), true))
      .order('desc')
      .collect()

    return document
  },
})

export const getSidebarDocument = query({
  args: {
    parentDocument: v.optional(v.id('documents')),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Unauthenticated')
    }

    const userId = identity.subject

    const document = await ctx.db
      .query('documents')
      .withIndex('by_user_parent', (q) =>
        q.eq('userId', userId).eq('parentDocument', args.parentDocument)
      )
      .filter((q) => q.eq(q.field('isArchived'), false))
      .order('desc')
      .collect()

    return document
  },
})

export const onArchiveDocument = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Unauthenticated')
    }

    const userId = identity.subject

    const existingDocument = await ctx.db.get(args.id)

    if (!existingDocument) {
      throw new Error('Existing document not found')
    }

    if (existingDocument.userId !== userId) {
      throw new Error('Unauthorized')
    }

    const recursiveArchive = async (documentId: Id<'documents'>) => {
      const childDoc = await ctx.db
        .query('documents')
        .withIndex('by_user_parent', (q) =>
          q.eq('userId', userId).eq('parentDocument', documentId)
        )
        .collect()

      for (const child of childDoc) {
        await ctx.db.patch(child._id, {
          isArchived: true,
        })

        await recursiveArchive(child._id)
      }
    }

    const document = await ctx.db.patch(args.id, {
      isArchived: true,
    })

    recursiveArchive(args.id)

    return document
  },
})

export const onDeleteDocument = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Unauthenticated')
    }

    const userId = identity.subject

    const existingDocument = await ctx.db.get(args.id)

    if (!existingDocument) {
      throw new Error('Existing document not found')
    }

    if (existingDocument.userId !== userId) {
      throw new Error('Unauthorized')
    }

    const document = await ctx.db.delete(args.id)

    return document
  },
})

export const onRestoreDocument = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Unauthenticated')
    }

    const userId = identity.subject

    const existingDocument = await ctx.db.get(args.id)

    const options: Partial<Doc<'documents'>> = {
      isArchived: false,
    }

    if (!existingDocument) {
      throw new Error('Existing document not found')
    }

    if (existingDocument.userId !== userId) {
      throw new Error('Unauthorized')
    }

    if (existingDocument.parentDocument) {
      const parentDoc = await ctx.db.get(existingDocument.parentDocument)

      if (parentDoc?.isArchived) {
        options.parentDocument = undefined
      }
    }

    const recursiveRestore = async (documentId: Id<'documents'>) => {
      const childDoc = await ctx.db
        .query('documents')
        .withIndex('by_user_parent', (q) =>
          q.eq('userId', userId).eq('parentDocument', documentId)
        )
        .collect()

      for (const child of childDoc) {
        await ctx.db.patch(child._id, {
          isArchived: false,
        })

        await recursiveRestore(child._id)
      }
    }

    const document = await ctx.db.patch(args.id, options)

    recursiveRestore(args.id)

    return document
  },
})
