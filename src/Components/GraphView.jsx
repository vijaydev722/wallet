import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Background, Controls, MiniMap, ReactFlow, useEdgesState, useNodesState} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const GraphView = () => {
  const { value: { inflow, outflow }, theme, searchWalletAddress } = useSelector((state) => state.wallet);  
  
  const getRandomThemeColor = () =>  {
    const colors = ['#008080', '#6A5ACD', '#3CB371'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  
  useEffect(()=>{
    console.log(searchWalletAddress);
    onAddNodes(searchWalletAddress);
    onAddEdges(searchWalletAddress);
  },[searchWalletAddress])
  
  const onAddNodes = (centralWallet) => {
    setNodes([]);
    const nodes =[
      {
        id: centralWallet,
        type: 'default',
        position: { x: 100, y: 250 },
        data: { label: centralWallet },
        style: { border: '1px solid green', fontSize: 4 },
      },
      ...inflow.map((tx, i) => ({
        id: tx.payer_address,
        type: 'default',
        position: { x: 200 * i, y: 100 },
        data: { label: `${tx.entity_name.toUpperCase() !== 'UNKNOWN' ? tx.entity_name : tx.payer_address}` },
        style: { border: `1px solid ${getRandomThemeColor()}`, fontSize: 4 }
      })),
      ...outflow.map((tx, i) => ({
        id: tx.beneficiary_address,
        type: 'default',
        position: { x: 200 * i, y: 500 },
        data: { label: `${tx.entity_name.toUpperCase() !== 'UNKNOWN' ? tx.entity_name : tx.beneficiary_address}` },
        style: { border: `1px solid ${getRandomThemeColor()}`, fontSize: 4 }
      })),
    ];
    setNodes((nds) => nds.concat(nodes));
  }
  
  const onAddEdges = (centralWallet) => {
    setEdges([]);
    const edges = [
      ...inflow.map((tx) => ({
        id: `e${tx.payer_address}->${centralWallet}`,
        source: tx.payer_address,
        target: centralWallet,
        label: `${tx.amount} BTC`,
        animated: false,
        style: { stroke: '#4ade80' },
      })),
      ...outflow.map((tx) => ({
        id: `e${tx.beneficiary_address}->${centralWallet}`,
        source: centralWallet,
        target: tx.beneficiary_address,
        label: `${tx.amount} BTC`,
        animated: false,
        style: { stroke: '#4ade80' },
      }))
    ]
    setEdges((edge) => edge.concat(edges));
  }

  
  const initialNodes = [
        {
          id: searchWalletAddress,
          type: 'default',
          position: { x: 100, y: 250 },
          data: { label: searchWalletAddress },
          style: { border: '1px solid green', fontSize: 4 },
        },
        ...inflow.map((tx, i) => ({
          id: tx.payer_address,
          type: 'default',
          position: { x: 200 * i, y: 100 },
          data: { label: `${tx.entity_name.toUpperCase() !== 'UNKNOWN' ? tx.entity_name : tx.payer_address}` },
          style: { border: `1px solid ${getRandomThemeColor()}`, fontSize: 4 }
        })),
        ...outflow.map((tx, i) => ({
          id: tx.beneficiary_address,
          type: 'default',
          position: { x: 200 * i, y: 500 },
          data: { label: `${tx.entity_name.toUpperCase() !== 'UNKNOWN' ? tx.entity_name : tx.beneficiary_address}` },
          style: { border: `1px solid ${getRandomThemeColor()}`, fontSize: 4 }
        })),
  ];

  const initialEdges = [
    ...inflow.map((tx) => ({
      id: `e${tx.payer_address}->${searchWalletAddress}`,
      source: tx.payer_address,
      target: searchWalletAddress,
      label: `${tx.amount} BTC`,
      animated: false,
      style: { stroke: '#4ade80' },
    })),
    ...outflow.map((tx) => ({
      id: `e${tx.beneficiary_address}->${searchWalletAddress}`,
      source: searchWalletAddress,
      target: tx.beneficiary_address,
      label: `${tx.amount} BTC`,
      animated: false,
      style: { stroke: '#4ade80' },
    }))
  ]

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (

    <div style={{ height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        edges={edges}
        colorMode={theme}
        fitView
        >
        <MiniMap />
        <Background size={1}/>
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default GraphView;
