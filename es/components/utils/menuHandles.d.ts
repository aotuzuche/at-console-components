declare const findMenuInfo: (value: any, menuTree: any, key?: string) => any;
declare const getMenuPathInfos: (ids: never[] | undefined, menuTree: any) => any[];
declare const findMenuPathIds: (path: string, menuTree: any) => any[];
/**
 * Generate a tree structure from flat data.
 *
 * @param {!Object[]} flatData
 * @param {!function=} getKey - Function to get the key from the nodeData
 * @param {!function=} getParentKey - Function to get the parent key from the nodeData
 * @param {string|number=} rootKey - The value returned by `getParentKey` that corresponds to the root node.
 * For example, if your nodes have id 1-99, you might use rootKey = 0
 *
 * @return {Object[]} treeData - The flat data represented as a tree
 */
declare const getTreeFromFlatData: (args: any) => any;
export { findMenuInfo, getMenuPathInfos, findMenuPathIds, getTreeFromFlatData };
