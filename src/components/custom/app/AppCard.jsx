import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SheetDescription, SheetFooter, SheetTitle } from "@/components/ui/sheet";
import { LayoutContext } from "@/contexts/interact";
import { SheetContext } from "@/contexts/sheet";
import { SourceContext } from "@/contexts/source";
import { BadgeX, Lock, LockOpen, Settings, Settings2 } from "lucide-react";
import { lazy, Suspense, useContext, useEffect, useMemo, useState } from "react";

const KPICard = lazy(() => import('./cards/KPICard'));
const SimpleKPICard = lazy(() => import('./cards/SimpleKPICard'));
const StatCard = lazy(() => import('./cards/StatCard'));
const SimpleStatCard = lazy(() => import('./cards/SimpleStatCard'));

const AppCard = ({ props, elementId }) => {
  const { layout, components, updateLayout, updateComponent } = useContext(LayoutContext)
  const { setSheetOpen, setSheetProps, setSheetFormValue } = useContext(SheetContext);
  const { getById } = useContext(SourceContext)

  let dataById = {};

  if (props?.id_resource_data) {
    const data = getById(props?.id_resource_data)
    dataById = data
  }

  const remove = (i) => {
    const newComponent = components.filter((item) => item.i !== i)
    const newLayout = layout.filter((item) => item.i !== i)
    updateComponent(newComponent)
    updateLayout(newLayout)
  }

  const lock = (i) => {
    const index = layout.findIndex((item) => item.i === i)
    if (index >= 0) {
      const newLayout = [...layout]
      newLayout[index].static = true
      updateLayout(newLayout)
    }
  }

  const unLock = (i) => {
    const index = layout.findIndex((item) => item.i === i)
    if (index >= 0) {
      const newLayout = [...layout]
      newLayout[index].static = false
      updateLayout(newLayout)
    }
  }

  const renderCard = useMemo(() => {
    return components.map((item) => {
      if (item.i === elementId && item?.props?.card_type == 'kpi') {
        return (
          <Suspense fallback={
            <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>Loading...</CardDescription>
          } key={item.i}>
            {<SimpleKPICard {...item.props} dataItem={dataById} /> || <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>No content available</CardDescription>}
          </Suspense>
        );
      }

      if (item.i === elementId && item?.props?.card_type == 'stat') {
        return (
          <Suspense fallback={
            <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>Loading...</CardDescription>
          } key={item.i}>
            {<SimpleStatCard {...item.props} dataItem={dataById} /> || <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>No content available</CardDescription>}
          </Suspense>
        );
      }
    });
  }, [components, elementId]);

  return (
    <Card className='overflow-hidden w-full h-full gap-0 p-1 z-9'>
      <CardHeader className='p-1 flex items-center justify-between mb-2 drag-handle cursor-move hover:bg-slate-50 dark:hover:bg-slate-800 rounded-t-lg transition-colors'>
        <CardTitle className='truncate font-semibold text-sm ml-2'>{props?.title}</CardTitle>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger className='rounded-md p-1 hover:shadow-md border border-gray-100 hover:border-gray-300 hover:bg-gray-100 transition-all duration-200'>
              <Settings size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {
                setSheetProps({
                  title: "Widget Configuration",
                  desc: "configuration for data visualitation widget",
                  children: <AppSheetChildren elementId={elementId} props={props} />
                });
                setSheetFormValue('card_type', props?.card_type);
                setSheetFormValue('id_resource_data', props?.id_resource_data);
                setSheetFormValue('text_size', props?.text_size);
                setSheetFormValue('value_color', props?.value_color);
                setSheetOpen(true)
              }}>
                <Settings2 />
                Configure
              </DropdownMenuItem>
              {layout.find(item => item.i === elementId)?.static ? (
                <DropdownMenuItem onClick={() => unLock(elementId)}><LockOpen /> Unlock</DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => lock(elementId)}><Lock /> Lock</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => remove(elementId)} className="text-red-500"><BadgeX className="text-red-500" /> Remove</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      {props?.card_type ?
        renderCard
        :
        <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>No Content Available</CardDescription>
      }
    </Card>
  );
}

export default AppCard

function AppSheetChildren({ props, elementId }) {
  const { sheetForm, setSheetFormValue, setSheetOpen } = useContext(SheetContext);
  const { components, updateComponent } = useContext(LayoutContext)
  const { sources, getById } = useContext(SourceContext)

  const [xData, setDataX] = useState([]);

  useEffect(() => {
    const id = sheetForm?.id_resource_data ?? props?.id_resource_data;
    if (id) {
      if (Array.isArray(getById(id)?.fileData)) {
        setDataX(Object.keys(getById(id)?.fileData[0]) ?? []);
      } else {
        setDataX(Object.keys(getById(id)?.fileData) ?? []);
      }
    }
  }, [props.id_resource_data, sheetForm?.id_resource_data]);

  const handleSaveSheet = () => {
    const updatedData = components.map(item =>
      item.i === elementId
        ? {
          ...item,
          props: {
            ...item.props,
            ...sheetForm,
          },
        }
        : item
    );

    updateComponent(updatedData);
    setSheetOpen(false);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto pr-4">
        <div className="grid grid-cols-1 gap-4 pl-4 pr-4">
          <Label htmlFor={elementId}>Data Resource</Label>
          <Select
            defaultValue={props?.id_resource_data ?? ""}
            onValueChange={(value) => {
              setSheetFormValue("id_resource_data", value);
              setSheetFormValue("value_kpi", []);
              setSheetFormValue("subtitle_kpi", []);
              setSheetFormValue("percentage_kpi", "");
              setSheetFormValue("data_1", "");
              setSheetFormValue("title_1", "");
              setSheetFormValue("data_2", "");
              setSheetFormValue("title_2", "");
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>List Data</SelectLabel>
                {sources.map((item, i) => (
                  <SelectItem key={i} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="grid gap-3">
            <Label htmlFor={elementId}>Widget Label</Label>
            <Input
              id={elementId}
              defaultValue={props?.title}
              onChange={(e) => setSheetFormValue("title", e.target.value)}
            />
          </div>

          <Label htmlFor={elementId}>Card Type</Label>
          <Select
            defaultValue={props?.card_type ?? ""}
            onValueChange={(value) => setSheetFormValue("card_type", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>List Data</SelectLabel>
                <SelectItem value="kpi">KPI Card</SelectItem>
                <SelectItem value="stat">Stat Card</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {['kpi'].includes(sheetForm?.card_type ?? props?.card_type) &&
            <>
              <SheetTitle>Configuration Card</SheetTitle>
              <SheetDescription>Set your card data and type here.</SheetDescription>
              <Label htmlFor={elementId}>Value of KPI</Label>
              <Select
                defaultValue={props?.value_kpi ?? ""}
                onValueChange={(value) => setSheetFormValue("value_kpi", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Keys List</SelectLabel>
                    {xData.map((item, index) => (
                      <SelectItem key={index} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Label htmlFor={elementId}>Subtitle of KPI</Label>
              <Select
                defaultValue={props?.value_kpi ?? ""}
                onValueChange={(value) => setSheetFormValue("subtitle_kpi", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Keys List</SelectLabel>
                    {xData.map((item, index) => (
                      <SelectItem key={index} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Label htmlFor={elementId}>Percentage of KPI</Label>
              <Select
                defaultValue={props?.percentage_kpi ?? ""}
                onValueChange={(value) => setSheetFormValue("percentage_kpi", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Keys List</SelectLabel>
                    {xData.map((item, index) => (
                      <SelectItem key={index} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <SheetTitle className="mt-4">Style Configuration</SheetTitle>
              <SheetDescription>Customize the appearance of your KPI card.</SheetDescription>

              <Label htmlFor={elementId}>Text Size</Label>
              <Select
                defaultValue={props?.text_size ?? "normal"}
                onValueChange={(value) => setSheetFormValue("text_size", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Size Options</SelectLabel>
                    <SelectItem value="small">Small (text-xl)</SelectItem>
                    <SelectItem value="normal">Normal (text-2xl)</SelectItem>
                    <SelectItem value="large">Large (text-4xl)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Label htmlFor={elementId}>Value Color</Label>
              <Select
                defaultValue={props?.value_color ?? "auto"}
                onValueChange={(value) => setSheetFormValue("value_color", value === "auto" ? null : value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Color Options</SelectLabel>
                    <SelectItem value="auto">Auto (based on title)</SelectItem>
                    <SelectItem value="text-blue-400">Blue</SelectItem>
                    <SelectItem value="text-green-400">Green</SelectItem>
                    <SelectItem value="text-red-400">Red</SelectItem>
                    <SelectItem value="text-yellow-400">Yellow</SelectItem>
                    <SelectItem value="text-orange-400">Orange</SelectItem>
                    <SelectItem value="text-purple-400">Purple</SelectItem>
                    <SelectItem value="text-cyan-400">Cyan</SelectItem>
                    <SelectItem value="text-white">White</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
          }

          {['stat'].includes(sheetForm?.card_type ?? props?.card_type) &&
            <>
              <SheetTitle>Configuration Card</SheetTitle>
              <SheetDescription>Set your card data and type here.</SheetDescription>
              <Label htmlFor={elementId}>Data 1</Label>
              <Select
                defaultValue={props?.data_1 ?? ""}
                onValueChange={(value) => setSheetFormValue("data_1", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Keys List</SelectLabel>
                    {xData.map((item, index) => (
                      <SelectItem key={index} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className="grid gap-3">
                <Label htmlFor={elementId}>Title 1</Label>
                <Input
                  id={elementId}
                  defaultValue={props?.title_1}
                  onChange={(e) => setSheetFormValue("title_1", e.target.value)}
                />
              </div>

              <Label htmlFor={elementId}>Data 2</Label>
              <Select
                defaultValue={props?.data_2 ?? ""}
                onValueChange={(value) => setSheetFormValue("data_2", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Keys List</SelectLabel>
                    {xData.map((item, index) => (
                      <SelectItem key={index} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className="grid gap-3">
                <Label htmlFor={elementId}>Title 2</Label>
                <Input
                  id={elementId}
                  defaultValue={props?.title_2}
                  onChange={(e) => setSheetFormValue("title_2", e.target.value)}
                />
              </div>

              <SheetTitle className="mt-4">Style Configuration</SheetTitle>
              <SheetDescription>Customize the appearance of your Stat card.</SheetDescription>

              <Label htmlFor={elementId}>Text Size</Label>
              <Select
                defaultValue={props?.text_size ?? "normal"}
                onValueChange={(value) => setSheetFormValue("text_size", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Size Options</SelectLabel>
                    <SelectItem value="small">Small (text-xl)</SelectItem>
                    <SelectItem value="normal">Normal (text-3xl)</SelectItem>
                    <SelectItem value="large">Large (text-4xl)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Label htmlFor={elementId}>Value Color</Label>
              <Select
                defaultValue={props?.value_color ?? "auto"}
                onValueChange={(value) => setSheetFormValue("value_color", value === "auto" ? null : value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Color Options</SelectLabel>
                    <SelectItem value="auto">Auto (based on title)</SelectItem>
                    <SelectItem value="text-blue-400">Blue</SelectItem>
                    <SelectItem value="text-green-400">Green</SelectItem>
                    <SelectItem value="text-red-400">Red</SelectItem>
                    <SelectItem value="text-yellow-400">Yellow</SelectItem>
                    <SelectItem value="text-orange-400">Orange</SelectItem>
                    <SelectItem value="text-purple-400">Purple</SelectItem>
                    <SelectItem value="text-cyan-400">Cyan</SelectItem>
                    <SelectItem value="text-white">White</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
          }
        </div>
      </div>
      <SheetFooter>
        <Button type="submit" onClick={handleSaveSheet}>Apply</Button>
      </SheetFooter>
    </>
  );
}