package com.hym.algorithm;

import java.util.*;

/**
 * https://www.baeldung.com/java-dijkstra
 */
public class DijkstraNode {
    
    public static void main(String[] args){
        DNode nodeA = new DNode("A");
        DNode nodeB = new DNode("B");
        DNode nodeC = new DNode("C");
        DNode nodeD = new DNode("D");
        DNode nodeE = new DNode("E");
        DNode nodeF = new DNode("F");

        nodeA.addDestination(nodeB, 10);
        nodeA.addDestination(nodeC, 15);

        nodeB.addDestination(nodeD, 12);
        nodeB.addDestination(nodeF, 15);

        nodeC.addDestination(nodeE, 10);

        nodeD.addDestination(nodeE, 2);
        nodeD.addDestination(nodeF, 1);

        nodeF.addDestination(nodeE, 5);

        DGraph graph = new DGraph();

        graph.addNode(nodeA);
        graph.addNode(nodeB);
        graph.addNode(nodeC);
        graph.addNode(nodeD);
        graph.addNode(nodeE);
        graph.addNode(nodeF);

        graph = calculateShortestPathFromSource(graph, nodeA);
        System.out.println(graph.getNodes());
    }

    public static DGraph calculateShortestPathFromSource(DGraph graph, DNode source) {
        source.setDistance(0);

        Set<DNode> settledNodes = new HashSet<>();
        Set<DNode> unsettledNodes = new HashSet<>();

        unsettledNodes.add(source);

        while (unsettledNodes.size() != 0) {
            DNode currentNode = getLowestDistanceNode(unsettledNodes);
            unsettledNodes.remove(currentNode);
            for (Map.Entry< DNode, Integer> adjacencyPair:
                    currentNode.getAdjacentNodes().entrySet()) {
                DNode adjacentNode = adjacencyPair.getKey();
                Integer edgeWeight = adjacencyPair.getValue();
                if (!settledNodes.contains(adjacentNode)) {
                    calculateMinimumDistance(adjacentNode, edgeWeight, currentNode);
                    unsettledNodes.add(adjacentNode);
                }
            }
            settledNodes.add(currentNode);
        }
        return graph;
    }

    private static DNode getLowestDistanceNode(Set < DNode > unsettledNodes) {
        DNode lowestDistanceNode = null;
        int lowestDistance = Integer.MAX_VALUE;
        for (DNode node: unsettledNodes) {
            int nodeDistance = node.getDistance();
            if (nodeDistance < lowestDistance) {
                lowestDistance = nodeDistance;
                lowestDistanceNode = node;
            }
        }
        return lowestDistanceNode;
    }

    private static void calculateMinimumDistance(DNode evaluationNode, Integer edgeWeigh, DNode sourceNode) {
        Integer sourceDistance = sourceNode.getDistance();
        if (sourceDistance + edgeWeigh < evaluationNode.getDistance()) {
            evaluationNode.setDistance(sourceDistance + edgeWeigh);
            LinkedList<DNode> shortestPath = new LinkedList<>(sourceNode.getShortestPath());
            shortestPath.add(sourceNode);
            evaluationNode.setShortestPath(shortestPath);
        }
    }
}

class DNode {

    private String name;

    private List<DNode> shortestPath = new LinkedList<>();

    private Integer distance = Integer.MAX_VALUE;

    Map<DNode, Integer> adjacentNodes = new HashMap<>();

    public void addDestination(DNode destination, int distance) {
        adjacentNodes.put(destination, distance);
    }

    public DNode(String name) {
        this.name = name;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<DNode> getShortestPath() {
        return shortestPath;
    }

    public void setShortestPath(List<DNode> shortestPath) {
        this.shortestPath = shortestPath;
    }

    public Integer getDistance() {
        return distance;
    }

    public void setDistance(Integer distance) {
        this.distance = distance;
    }

    public Map<DNode, Integer> getAdjacentNodes() {
        return adjacentNodes;
    }

    public void setAdjacentNodes(Map<DNode, Integer> adjacentNodes) {
        this.adjacentNodes = adjacentNodes;
    }
}

class DGraph {

    private Set<DNode> nodes = new HashSet<>();

    public void addNode(DNode nodeA) {
        nodes.add(nodeA);
    }

    public Set<DNode> getNodes() {
        return nodes;
    }

    public void setNodes(Set<DNode> nodes) {
        this.nodes = nodes;
    }
}