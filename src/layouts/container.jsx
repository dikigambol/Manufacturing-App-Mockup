import AppSheet from "@/components/custom/app/AppSheet";
import { CardDescription } from "@/components/ui/card";
import { LayoutContext } from "@/contexts/interact";
import { LoadingDashboard } from "@/components/ui/loading-spinner";
import { lazy, Suspense, useContext, useMemo, useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Widget = lazy(() => import('./../components/custom/app/Widget'));
const Datatable = lazy(() => import('./../components/custom/app/Datatable'));
const Card = lazy(() => import('../components/custom/app/AppCard'));

export const Container = () => {
    const { updateLayout, layout, components } = useContext(LayoutContext)
    const [isLoading, setIsLoading] = useState(true)

    // Show loading state initially
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000)
        return () => clearTimeout(timer)
    }, [])

    const layouts = {
        lg: layout.map((item, i) => {
            const component = components[i];
            return {
                i: component.i.toString(),
                x: item.x ?? 0,
                y: item.y ?? 0, // Changed from Infinity to 0
                w: item.w && item.w > 1 ? item.w : 12, // Default width 12 (1/4 of 48 cols)
                h: item.h && item.h > 1 ? item.h : 15, // Default height 15
                static: item.static ?? false,
                minW: 6,  // Minimum width
                minH: 8,  // Minimum height
                maxW: 48, // Maximum width (full width)
                maxH: 100, // Maximum height (increased for flexibility)
            }
        })
    };

    const onChangeLayout = (newLayout) => {
        const filtered = ['w', 'h', 'x', 'y', 'i', 'static'];
        const newLayouts = newLayout.map(item => Object.fromEntries(
            filtered.map(key => [key, item[key]])
        ));
        updateLayout(newLayouts)
    }

    const renderComponen = useMemo(() => {
        return components.map((item) => {
            if (item.label == "Datatable") {
                return (
                    <div key={item.i} data-grid={layouts.lg.find(l => l.i === item.i.toString())}>
                        <Suspense fallback={
                            <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>Loading...</CardDescription>
                        }>
                            <Datatable props={item.props} elementId={item.i} />
                        </Suspense>
                    </div>
                );
            }

            if (item.label == "Widget") {
                return (
                    <div key={item.i} data-grid={layouts.lg.find(l => l.i === item.i.toString())}>
                        <Suspense fallback={
                            <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>Loading...</CardDescription>
                        }>
                            <Widget props={item.props} elementId={item.i} />
                        </Suspense>
                    </div>
                )
            }

            if (item.label == "Card") {
                return (
                    <div key={item.i} data-grid={layouts.lg.find(l => l.i === item.i.toString())}>
                        <Suspense fallback={
                            <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>Loading...</CardDescription>
                        }>
                            <Card props={item.props} elementId={item.i} />
                        </Suspense>
                    </div>
                )
            }
        });
    }, [components, layout]);

    // Conditional rendering after all hooks
    if (isLoading) {
        return <LoadingDashboard />
    }

    return (
        <div className="p-6 min-h-screen bg-slate-50/50 dark:bg-slate-900/50">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        Production Dashboard
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Monitor your manufacturing operations in real-time
                    </p>
                </div>
                {components.length > 0 && (
                    <div className="text-sm text-slate-500 dark:text-slate-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-800">
                        💡 <span className="font-medium">Tip:</span> Drag widgets by their header to reposition • Hover edges to resize width & height
                    </div>
                )}
            </div>

            <ResponsiveReactGridLayout
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 48, md: 40, sm: 32, xs: 24, xxs: 16 }}
                rowHeight={8}
                margin={[16, 16]}
                containerPadding={[0, 0]}
                compactType="vertical"
                preventCollision={false}
                resizeHandles={["se", "s", "e", "sw"]}
                useCSSTransforms
                isDraggable={true}
                isResizable={true}
                draggableHandle=".drag-handle"
                onLayoutChange={onChangeLayout}
                className="dashboard-grid"
            >
                {renderComponen}
            </ResponsiveReactGridLayout>

            <AppSheet />
        </div>
    );
}