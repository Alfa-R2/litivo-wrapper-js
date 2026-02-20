import type { AssetsType } from '../../models/assets.js';
import BaseSection from '../bases/section.js';

/** TODO: Assets (feat: extend create insolvency method with assets section) */
class AssetsSection extends BaseSection<[AssetsType]> {
  // TODO: Check if it is ok to accept AssetsType or AssetsType.optional()

  public async send(assets: AssetsType): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default AssetsSection;
