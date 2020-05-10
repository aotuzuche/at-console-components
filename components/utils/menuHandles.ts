// 根据关键字查找菜单的信息
const findMenuInfo = (value: any, menuTree: any, key = 'id'): any => {
  if (!(menuTree instanceof Array)) {
    return null
  }
  let result = null
  for (const item of menuTree) {
    if (item[key] && item[key].toString() === value.toString()) {
      result = item
      break
    }

    if (item.children instanceof Array) {
      result = findMenuInfo(value, item.children, key)
      if (result) {
        break
      }
      continue
    }
  }

  return result
}

// 获取所有父集节点
const getMenuPathInfos = (ids = [], menuTree: any) => {
  const menuPathInfos = ids.map(id => {
    return findMenuInfo(id, menuTree)
  })
  return menuPathInfos
}

// 根据路径从它开始一直找它的父节点，到根节点为止
// 然后用数组的形式返回所有节点的id
const findMenuPathIds = (path: string, menuTree: any) => {
  if (!(menuTree instanceof Array)) {
    return []
  }

  const curr = findMenuInfo(path, menuTree, 'url')
  const menuIds = []
  let p = curr ? curr.id : null

  if (p) {
    menuIds.unshift(p)
  }

  while (p) {
    const t = findMenuInfo(p, menuTree)
    if (t.pid) {
      p = t.pid
      menuIds.unshift(p)
    } else {
      p = null
    }
  }

  return menuIds
}

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
const getTreeFromFlatData = (args: any) => {
  const {
    flatData,
    getKey = (node: any) => node.id,
    getParentKey = (node: any) => node.parentId,
    rootKey = '0',
  } = args

  if (!flatData) {
    return []
  }

  const childrenToParents: any = {}
  flatData.forEach((child: any) => {
    const parentKey = getParentKey(child)

    if (parentKey in childrenToParents) {
      childrenToParents[parentKey].push(child)
    } else {
      childrenToParents[parentKey] = [child]
    }
  })

  if (!(rootKey in childrenToParents)) {
    return []
  }

  const trav = (parent: any) => {
    const parentKey = getKey(parent)
    if (parentKey in childrenToParents) {
      return {
        ...parent,
        children: childrenToParents[parentKey].map((child: any) => trav(child)),
      }
    }

    return { ...parent }
  }

  return childrenToParents[rootKey].map((child: any) => trav(child))
}

export { findMenuInfo, getMenuPathInfos, findMenuPathIds, getTreeFromFlatData }
