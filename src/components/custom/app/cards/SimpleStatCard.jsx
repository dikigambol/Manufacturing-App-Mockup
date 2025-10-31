import React from 'react';

function SimpleStatCard({ ...props }) {
    // Safely extract data with fallbacks
    const data1 = props?.dataItem?.fileData?.[props?.data_1] || 0;

    // Get text size configuration
    const getTextSize = () => {
        const size = props?.text_size || 'normal';
        switch (size) {
            case 'small': return 'text-xl';
            case 'large': return 'text-4xl';
            case 'normal':
            default: return 'text-3xl';
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

        if (title.includes('engineering') || title.includes('call')) {
            return 'text-yellow-400';
        } else if (title.includes('maintenance')) {
            return 'text-orange-400';
        }

        return 'text-blue-400';
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
            {/* Label */}
            <div className="text-xs text-gray-400 mb-1 text-center">
                {props?.title || 'Metric'}
            </div>

            {/* Value - Large number */}
            <div className={`${getTextSize()} font-bold ${getValueColor()}`}>
                {typeof data1 === 'number' ? data1.toLocaleString() : data1}
            </div>

            {/* Optional subtitle */}
            {props?.title_1 && (
                <div className="text-[10px] text-gray-500 mt-0.5">
                    {props?.title_1}
                </div>
            )}
        </div>
    );
}

export default SimpleStatCard;

