"use client";
import { useState, useEffect, useCallback } from "react";
import CheckboxTree, { Node } from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { Input } from "../ui/input";
import {
  Search,
  CheckSquare,
  Square,
  ChevronRight,
  Check,
  ChevronDown,
} from "lucide-react";

// Define props interface
interface CheckBoxTreeWithFilterProps {
  nodes: Node[];
  checkedNodes: string[];
  expandedNodes: string[];
}

const CheckBoxTreeWithFilter: React.FC<CheckBoxTreeWithFilterProps> = ({
  nodes,
  checkedNodes,
  expandedNodes,
}) => {
  const [checked, setChecked] = useState<string[]>(checkedNodes);
  const [expanded, setExpanded] = useState(expandedNodes);
  const [filterText, setFilterText] = useState("");
  const [filteredNodes, setFilteredNodes] = useState<Node[]>(nodes);

  const filterNodes = useCallback(
    (filtered: Node[], node: any) => {
      const children = (node.children || []).reduce(filterNodes, []);

      if (
        node.label.toLowerCase().includes(filterText.toLowerCase()) ||
        children.length
      ) {
        filtered.push({ ...node, children });
      }

      return filtered;
    },
    [filterText],
  );

  useEffect(() => {
    const filterTree = () => {
      if (!filterText) {
        setFilteredNodes(nodes);
        return;
      }

      setFilteredNodes(nodes.reduce(filterNodes, []));
    };
    filterTree();
  }, [filterText, nodes, filterNodes]);

  const onCheck = (checked: string[]) => {
    setChecked(checked);
  };

  const onExpand = (expanded: string[]) => {
    setExpanded(expanded);
  };

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const icons = {
    check: (
      <Check className="h-4 w-4 rounded-[2px] bg-red-500 text-background" />
    ),
    uncheck: <Square className="h-4 w-4 text-muted-foreground" />,
    halfCheck: <CheckSquare className="h-4 w-4 text-red-300" />,
    expandClose: <ChevronRight className="h-4 w-4" />,
    expandOpen: <ChevronDown className="h-4 w-4" />,
    parentClose: null,
    parentOpen: null,
    leaf: null,
    root: null,
  };

  return (
    <div className="mb-2 flex w-full flex-col gap-2">
      <div className="group relative flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="custom-search w-full rounded-2xl bg-muted pl-8 focus:border-0"
          value={filterText}
          onChange={onFilterChange}
        />
      </div>
      <div className="overflow-y-auto">
        <CheckboxTree
          checked={checked}
          expanded={expanded}
          nodes={filteredNodes}
          onCheck={onCheck}
          onExpand={onExpand}
          icons={icons}
          showNodeIcon={false}
          showExpandAll
        />
      </div>
    </div>
  );
};

export default CheckBoxTreeWithFilter;
