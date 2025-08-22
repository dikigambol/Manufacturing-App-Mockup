import AppSheet from "@/components/custom/app/AppSheet";
import { CardDescription } from "@/components/ui/card";
import { LayoutContext } from "@/contexts/interact";
import { lazy, Suspense, useContext, useMemo, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Widget = lazy(() => import('./../components/custom/app/Widget'));
const Datatable = lazy(() => import('./../components/custom/app/Datatable'));
const Card = lazy(() => import('../components/custom/app/AppCard'));

export const Container = () => {
    const { updateLayout, layout, components } = useContext(LayoutContext)
    const [state, setState] = useState()
    const layouts = {
        lg: layout.map((item, i) => ({
            i: components[i].i.toString(),
            x: item.x ?? 0,
            y: item.y ?? Infinity,
            w: item.w == 1 ? 10 : item.w,
            h: item.h == 1 ? 10 : item.h,
            static: item.static ?? false,
            resizeHandles: ['se'],
        }))
    };

    const onChangeLayout = () => {
        const filtered = ['w', 'h', 'x', 'y', 'i', 'static'];
        const newLayouts = state.map(item => Object.fromEntries(
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

    useMemo(() => {
        if (state) {
            onChangeLayout();
        }
    }, [state]);

    return (
        <div style={{ paddingBottom: '100px' }}>
            <ResponsiveReactGridLayout
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 48, md: 40, sm: 32, xs: 24, xxs: 16 }}
                rowHeight={6}
                margin={[8, 8]}
                containerPadding={[0, 0]}
                compactType={null}
                preventCollision={true}
                resizeHandles={["se", "e", "s"]}
                useCSSTransforms
                onLayoutChange={(layout) => setState(layout)}
            >

                {renderComponen}
            </ResponsiveReactGridLayout>
            <AppSheet />
        </div>
    );
}