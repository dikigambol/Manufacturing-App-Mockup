import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Factory, TestTube, Eye, Bot, Wrench, Package, AlertTriangle } from 'lucide-react';

const MACHINE_TYPE_ICONS = {
    'Assembly': Factory,
    'Testing': TestTube,
    'Inspection': Eye,
    'Automated': Bot,
    'Manual': Wrench,
    'Packaging': Package
};

// Custom Handle Component with better UX
const CustomHandle = ({ type, position, id }) => {
    // Define colors based on position (vertical = input, horizontal = output)
    // Top & Bottom = Input (Blue)
    // Left & Right = Output (Green)
    const isOutput = position === Position.Left || position === Position.Right;
    const isInput = position === Position.Top || position === Position.Bottom;

    const handleColor = isOutput ? 'bg-green-500' : 'bg-blue-500';
    const handleHoverColor = isOutput ? 'hover:bg-green-400' : 'hover:bg-blue-400';
    const handleBorder = isOutput ? 'border-green-300' : 'border-blue-300';
    const handleShadow = isOutput ? 'shadow-green-500/50' : 'shadow-blue-500/50';
    const label = isOutput ? 'Output' : 'Input';
    const glowColor = isOutput ? 'rgba(34, 197, 94, 0.5)' : 'rgba(59, 130, 246, 0.5)';

    return (
        <Handle
            type={type}
            position={position}
            id={id}
            title={`${label} - ${position}`}
            className={`
                !w-4 !h-4 !rounded-full !border-2 !cursor-crosshair
                ${handleColor} ${handleBorder} ${handleHoverColor}
                !shadow-lg ${handleShadow}
                transition-all duration-200
                hover:!scale-150 hover:!shadow-xl
                !opacity-100
            `}
            style={{
                boxShadow: `0 0 12px ${glowColor}`,
                zIndex: 10,
            }}
        />
    );
};

const MachineNode = memo(({ data, selected, isInteractive }) => {
    const Icon = MACHINE_TYPE_ICONS[data.machine_type] || Factory;

    const statusColors = {
        running: {
            bg: 'bg-green-500',
            border: 'border-green-400',
            glow: 'shadow-green-500/50'
        },
        idle: {
            bg: 'bg-yellow-500',
            border: 'border-yellow-400',
            glow: 'shadow-yellow-500/50'
        },
        alarm: {
            bg: 'bg-red-500',
            border: 'border-red-400',
            glow: 'shadow-red-500/50'
        },
        disconnected: {
            bg: 'bg-gray-500',
            border: 'border-gray-400',
            glow: 'shadow-gray-500/50'
        }
    };

    const currentStatus = statusColors[data.status] || statusColors.disconnected;

    return (
        <div
            className={`
        machine-node-item
        relative bg-gray-800 rounded-lg shadow-xl overflow-hidden
        border-2 transition-all
        ${selected ? 'border-blue-500 shadow-blue-500/30' : `${currentStatus.border}`}
      `}
            style={{ width: 180, minHeight: 140 }}
        >
            {/* Connection Handles - 4 handles visible */}
            {/* Top & Bottom = Input (Blue, type="target") */}
            <CustomHandle type="target" position={Position.Top} id="top" />
            <CustomHandle type="target" position={Position.Bottom} id="bottom" />
            {/* Left & Right = Output (Green, type="source") */}
            <CustomHandle type="source" position={Position.Left} id="left" />
            <CustomHandle type="source" position={Position.Right} id="right" />

            {/* Status Indicator */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${currentStatus.bg}`} />

            {/* Node Header */}
            <div className="p-3 pb-2 bg-gradient-to-b from-gray-700 to-gray-800">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${currentStatus.bg}`} />
                    <span className="text-xs font-bold text-white truncate">
                        {data.machine_id}
                    </span>
                </div>
            </div>

            {/* Node Body */}
            <div className="p-3 pt-2">
                {/* Machine Icon */}
                <div className="flex justify-center mb-2">
                    <div className="p-2 bg-gray-700 rounded-lg">
                        <Icon className="h-8 w-8 text-gray-300" />
                    </div>
                </div>

                {/* Machine Name */}
                <h4 className="text-xs font-semibold text-white text-center mb-1 truncate">
                    {data.name}
                </h4>

                {/* Machine Type */}
                <p className="text-xs text-gray-400 text-center truncate">
                    {data.machine_type}
                </p>
            </div>

            {/* Alert Badges */}
            <div className="absolute top-2 right-2 flex flex-col gap-1">
                {data.status === 'alarm' && (
                    <div className="bg-red-500 rounded-full p-1 shadow-lg">
                        <AlertTriangle className="h-3 w-3 text-white" />
                    </div>
                )}
                {data.needsMaintenance && (
                    <div className="bg-orange-500 rounded-full p-1 shadow-lg">
                        <Wrench className="h-3 w-3 text-white" />
                    </div>
                )}
            </div>

            {/* Footer - Quick Stats (optional, based on data) */}
            {data.oee !== undefined && (
                <div className="px-3 pb-2">
                    <div className="text-xs text-center">
                        <span className="text-gray-500">OEE: </span>
                        <span className={`font-semibold ${data.oee >= 85 ? 'text-green-400' :
                            data.oee >= 70 ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                            {data.oee}%
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
});

MachineNode.displayName = 'MachineNode';

export default MachineNode;

