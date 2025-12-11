// src/api/homeLayout.api.ts

import { HomeLayoutRepository } from './folder.repository'
import type { HomeLayout, SocialMediaItem } from '../model/types'

// Initialize repository instance
const homeLayoutRepo = HomeLayoutRepository.getInstance()

/**
 * Home Layout API - Main entry point for all home layout operations
 * NOTE: Everything is async now because we fetch from the CMS.
 */
export const homeLayoutApi = {
  /**
   * Get complete home layout configuration
   */
  getLayout: async (opts?: { forceRefresh?: boolean }): Promise<HomeLayout> => {
    return homeLayoutRepo.getHomeLayout(Boolean(opts?.forceRefresh))
  },

  /**
   * Get header configuration including logo, navigation, button, and phone
   */
  getHeader: async () => {
    return homeLayoutRepo.getHeaderConfig()
  },

  /**
   * Get footer configuration including navigation, phone, and social links
   */
  getFooter: async () => {
    return homeLayoutRepo.getFooterConfig()
  },

  /**
   * Get header navigation items
   */
  getHeaderNav: async (): Promise<string[]> => {
    return homeLayoutRepo.getHeaderNavigation()
  },

  /**
   * Get footer navigation items
   */
  getFooterNav: async (): Promise<string[]> => {
    return homeLayoutRepo.getFooterNavigation()
  },

  /**
   * Get social media links
   */
  getSocialLinks: async (): Promise<SocialMediaItem[]> => {
    return homeLayoutRepo.getSocialMediaLinks()
  },

  /**
   * Get contact phone number
   */
  getPhone: async (): Promise<number | null> => {
    return homeLayoutRepo.getContactPhone()
  },

  /**
   * Update layout configuration (local override)
   */
  updateLayout: async (updates: Partial<HomeLayout>): Promise<void> => {
    await homeLayoutRepo.updateHomeLayout(updates)
  },
}

// Export types for external use
export type { HomeLayout, SocialMediaItem } from '../model/types'

// Export repository for advanced use cases
export { HomeLayoutRepository } from './folder.repository'

// Default export
export default homeLayoutApi
