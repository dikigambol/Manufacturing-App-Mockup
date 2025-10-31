import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SourceContext } from "@/contexts/source";

export default function DataSources() {
  const { loadSources } = useContext(SourceContext)
  const [sources, setSources] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", type: "", file: null });
  const [editId, setEditId] = useState(null);

  // Load from localStorage saat pertama kali render
  useEffect(() => {
    const stored = localStorage.getItem("dataSources");
    if (stored) setSources(JSON.parse(stored));
  }, []);

  // Simpan ke localStorage setiap sources berubah
  useEffect(() => {
    localStorage.setItem("dataSources", JSON.stringify(sources));
    loadSources();
  }, [sources]);

  const resetForm = () => {
    setForm({ name: "", type: "", file: null });
    setEditId(null);
  };

  const handleSave = () => {
    if (form.file) {
      // baca file jadi base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target.result;

        if (editId) {
          // Update data
          setSources((prev) =>
            prev.map((src) =>
              src.id === editId
                ? {
                    ...src,
                    name: form.name,
                    type: form.type,
                    fileName: form.file.name,
                    fileData: base64Data,
                  }
                : src
            )
          );
        } else {
          // Tambah data baru
          setSources((prev) => [
            ...prev,
            {
              id: Date.now(),
              name: form.name,
              type: form.type,
              fileName: form.file.name,
              fileData: base64Data,
            },
          ]);
        }
      };
      reader.readAsDataURL(form.file);
    } else {
      // Kalau edit tanpa ganti file
      if (editId) {
        setSources((prev) =>
          prev.map((src) =>
            src.id === editId
              ? {
                  ...src,
                  name: form.name,
                  type: form.type,
                }
              : src
          )
        );
      }
    }

    setOpen(false);
    resetForm();
  };

  const handleEdit = (id) => {
    const src = sources.find((s) => s.id === id);
    if (!src) return;
    setForm({ name: src.name, type: src.type, file: null });
    setEditId(id);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setSources((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Data Resources</h1>
        <Button onClick={() => setOpen(true)}>+ Add Data Source</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>File</TableHead>
            <TableHead className="w-[150px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sources.map((src) => (
            <TableRow key={src.id}>
              <TableCell>{src.name}</TableCell>
              <TableCell>{src.type}</TableCell>
              <TableCell>
                {src.fileName ? (
                  <a
                    href={src.fileData}
                    download={src.fileName}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {src.fileName}
                  </a>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(src.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(src.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editId ? "Edit Data Source" : "Add Data Source"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Nama Data Source"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <Select
              value={form.type}
              onValueChange={(value) => setForm({ ...form, type: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json">JSON (example only)</SelectItem>
                <SelectItem value="db" disabled>
                  Database (soon)
                </SelectItem>
                <SelectItem value="csv" disabled>CSV (soon)</SelectItem>
              </SelectContent>
            </Select>

            {(form.type === "json" || form.type === "csv") && (
              <Input
                type="file"
                accept={form.type === "json" ? ".json" : ".csv"}
                onChange={(e) =>
                  setForm({ ...form, file: e.target.files[0] })
                }
              />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editId ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
