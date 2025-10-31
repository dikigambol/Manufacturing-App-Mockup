import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { SheetContext } from "@/contexts/sheet";
import { useContext } from "react";

const AppSheet = () => {
    const { sheetOpen, setSheetOpen, sheetProps } = useContext(SheetContext);

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" style={{ display: 'none' }} />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{sheetProps?.title}</SheetTitle>
                    <SheetDescription>{sheetProps?.desc}</SheetDescription>
                </SheetHeader>
                {sheetProps?.children}
            </SheetContent>
        </Sheet>
    );
};

export default AppSheet;
