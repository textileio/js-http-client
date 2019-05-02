import { API } from '../core/api'

/**
 * Logs is an API module for managing the verbosity of one or all subsystems logs
 *
 * Textile logs piggyback on the IPFS event logs
 *
 * @extends API
 */
export default class Logs extends API {
  /**
   * List the verbosity of one or all subsystems logs
   *
   * @param subsystem Subsystem logging identifier (omit for all)
   * @param tex Whether to list only Textile subsystems, or all available subsystems
   * @returns An object of (current) key- (subsystem) value (level) pairs
   */
  async get(subsystem?: string, tex?: boolean) {
    const response = await this.sendGet(
      `logs${subsystem ? `/${subsystem}` : ''}`,
      undefined,
      { 'tex-only': tex || false }
    )
    return response.json() as Promise<Record<string, string>>
  }

  /**
   * Set the verbosity of one or all subsystems logs
   *
   * @param level Log level, must be one of: debug, info, warning, error, or critical.
   * @param subsystem Subsystem logging identifier (omit for all)
   * @param tex Whether to change only Textile subsystems, or all available subsystems
   * @returns An object of (updated) key- (subsystem) value (level) pairs
   */
  async set(level: string, subsystem?: string, tex?: boolean) {
    const response = await this.sendPost(
      `logs${subsystem ? `/${subsystem}` : ''}`,
      undefined,
      { level, 'tex-only': tex || false }
    )
    return response.json() as Promise<Record<string, string>>
  }
}
