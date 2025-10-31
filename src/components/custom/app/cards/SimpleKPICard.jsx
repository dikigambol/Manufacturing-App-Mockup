import React from 'react';

function SimpleKPICard({ ...props }) {
    // Extract value safely
    const value = props?.dataItem?.fileData?.[props?.value_kpi] || 0;
    const subtitle = props?.subtitle_kpi || '';

    // Get text size configuration
    const getTextSize = () => {
        const size = props?.text_size || 'normal';
        switch (size) {
            case 'small': return 'text-xl';
            case 'large': return 'text-4xl';
            case 'normal':
            default: return 'text-2xl';
        }
    };

    // Determine color based on custom color or auto-detect
    const getValueColor = () => {
        // If custom color is set, use it
        if (props?.value_color) {
            return props.value_color;
        }

        // Otherwise auto-detect based on title
        const title = props?.title?.toLowerCase() || '';

        if (title.includes('ok') || title.includes('good')) {
            return 'text-green-400';
        } else if (title.includes('ng') || title.includes('reject') || title.includes('error')) {
            return 'text-red-400';
        } else if (title.includes('cycle') || title.includes('time')) {
            return 'text-blue-400';
        } else if (title.includes('engineering') || title.includes('call')) {
            return 'text-yellow-400';
        } else if (title.includes('maintenance')) {
            return 'text-orange-400';
        }

        return 'text-white';
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
            {/* Label */}
            <div className="text-xs text-gray-400 mb-1 text-center">
                {props?.title || 'Metric'}
            </div>

            {/* Value */}
            <div className={`${getTextSize()} font-bold ${getValueColor()}`}>
                {typeof value === 'number' ? value.toLocaleString() : value}
            </div>

            {/* Subtitle/Unit */}
            {subtitle && (
                <div className="text-[10px] text-gray-500 mt-0.5">
                    {subtitle}
                </div>
            )}
        </div>
    );
}

export default SimpleKPICard;

