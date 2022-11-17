/**
 * Format a flat list WP nav menu into a heirarchial list.
 *
 * @author Highfivery
 * @see https://www.wpgraphql.com/docs/menus/#hierarchical-data
 */
export default function formatHeirarchialMenu(
  data = [],
  { idKey = "id", parentKey = "parentId", childrenKey = "children" } = {}
) {
  const tree = [];
  const childrenOf = {};
  data.forEach((item) => {
    const newItem = { ...item };
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
    childrenOf[id] = childrenOf[id] || [];
    newItem[childrenKey] = childrenOf[id];
    parentId
      ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
      : tree.push(newItem);
  });
  return tree;
}
