/**
 * Get API Identity UseCase
 */
class GetApiIdentityUseCase {
  /**
   * Get all validators
   */
  static getValidators() {
    return [];
  }

  /**
   * Execute UseCase
   */
  async execute() {
    return { message: 'My unsplash API' };
  }
}

module.exports = GetApiIdentityUseCase;
