import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SheetFooter } from "@/components/ui/sheet";
import { LayoutContext } from "@/contexts/interact";
import { SheetContext } from "@/contexts/sheet";
import { SourceContext } from "@/contexts/source";
import { BadgeX, Lock, LockOpen, Settings, Settings2 } from "lucide-react";
import { useContext, useState } from "react";
import Multiple from "./multipel";
import { local } from "@/utils/access";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const Datatable = ({ props, elementId }) => {
  const { layout, components, updateLayout, updateComponent } = useContext(LayoutContext)
  const { setSheetOpen, setSheetProps } = useContext(SheetContext);
  const { getById } = useContext(SourceContext)

  let tableData = [];

  if (props?.id_resource_data) {
    const data = getById(props.id_resource_data);

    const selectedFields = props?.displayed_fields.map(f => f.value);

    const filteredData = data.fileData.map(item =>
      Object.fromEntries(
        selectedFields.map(field => [field, item[field]])
      )
    );

    tableData = filteredData;
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

  return (
    <Card className='overflow-hidden w-full h-full gap-0 p-1 z-9'>
      <CardHeader className='p-1 flex items-center justify-between mb-2'>
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
      {props?.displayed_fields ?
        <div className="px-2 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {props?.displayed_fields.map(f => f.value).map((item, i) => (
                  <TableHead key={i} className="px-4 py-2">{item}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((x, i) => (
                <TableRow key={i}>
                  {props?.displayed_fields.map(f => f.value).map((y, i) => (
                    <TableCell key={i} className="px-4 py-2">{x[y]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        :
        <CardDescription className='text-sm text-gray-500 flex items-center justify-center text-center h-full'>No Content Available</CardDescription>
      }
    </Card>
  );
}

export default Datatable

function AppSheetChildren({ props, elementId }) {
  const { sheetForm, setSheetFormValue, setSheetOpen } = useContext(SheetContext);
  const { components, updateComponent } = useContext(LayoutContext)
  const { sources, getById } = useContext(SourceContext)

  let yData = [];

  if (props?.id_resource_data || sheetForm?.id_resource_data) {
    const data = props.id_resource_data ? getById(props.id_resource_data) : getById(sheetForm?.id_resource_data);
    yData = Object.keys(data.fileData[0]).map((item) => ({ label: item, value: item }));
  }

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
            onValueChange={(value) => setSheetFormValue("id_resource_data", value)}
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

          <Label htmlFor={elementId}>Displayed Fields</Label>
          <Multiple
            options={yData}
            value={props.displayed_fields}
            placeholder='Select Options'
            onSelect={value => setSheetFormValue('displayed_fields', value)}
          />
        </div>
      </div>
      <SheetFooter>
        <Button type="submit" onClick={handleSaveSheet}>Apply</Button>
      </SheetFooter>
    </>
  );
}