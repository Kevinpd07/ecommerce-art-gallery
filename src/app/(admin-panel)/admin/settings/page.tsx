"use client";

import { Save } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [storeName, setStoreName] = useState("ArtGallery");
  const [storeEmail, setStoreEmail] = useState("info@artgalleryshop.com");
  const [storePhone, setStorePhone] = useState("+1 555 123 4567");
  const [storeAddress, setStoreAddress] = useState("123 Main St, New York");
  const [storeDescription, setStoreDescription] = useState(
    "Tu tienda de arte de confianza",
  );
  const [timezone, setTimezone] = useState("america-new_york");
  const [currency, setCurrency] = useState("usd");

  // Load settings on mount
  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.storeName) setStoreName(data.storeName);
          if (data.storeEmail) setStoreEmail(data.storeEmail);
          if (data.storePhone) setStorePhone(data.storePhone);
          if (data.storeAddress) setStoreAddress(data.storeAddress);
          if (data.storeDescription) setStoreDescription(data.storeDescription);
          if (data.timezone) setTimezone(data.timezone);
          if (data.currency) setCurrency(data.currency);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const settings = {
        storeName,
        storeEmail,
        storePhone,
        storeAddress,
        storeDescription,
        timezone,
        currency,
      };

      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        alert("Configuración guardada correctamente");
      } else {
        const error = await res.json();
        alert(error.error || "Error al guardar");
      }
    } catch {
      alert("Error al guardar la configuración");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Configuracion</h1>
        <p className="text-muted-foreground">
          Administra la configuracion de tu tienda
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="store">Tienda</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="payments">Pagos</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informacion de la Tienda</CardTitle>
              <CardDescription>
                Configura la informacion basica de tu tienda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Nombre de la tienda</Label>
                  <Input
                    id="storeName"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Email de contacto</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={storeEmail}
                    onChange={(e) => setStoreEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Telefono</Label>
                  <Input
                    id="storePhone"
                    value={storePhone}
                    onChange={(e) => setStorePhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeAddress">Direccion</Label>
                  <Input
                    id="storeAddress"
                    value={storeAddress}
                    onChange={(e) => setStoreAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeDescription">Descripcion</Label>
                <Input
                  id="storeDescription"
                  value={storeDescription}
                  onChange={(e) => setStoreDescription(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Zona Horaria y Moneda</CardTitle>
              <CardDescription>
                Configura la zona horaria y moneda de tu tienda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Zona horaria</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-new_york">
                        America/New York (GMT-5)
                      </SelectItem>
                      <SelectItem value="america-miami">
                        America/Miami (GMT-5)
                      </SelectItem>
                      <SelectItem value="america-chicago">
                        America/Chicago (GMT-6)
                      </SelectItem>
                      <SelectItem value="america-denver">
                        America/Denver (GMT-7)
                      </SelectItem>
                      <SelectItem value="america-los_angeles">
                        America/Los Angeles (GMT-8)
                      </SelectItem>
                      <SelectItem value="america-lima">
                        America/Lima (GMT-5)
                      </SelectItem>
                      <SelectItem value="america-bogota">
                        America/Bogota (GMT-5)
                      </SelectItem>
                      <SelectItem value="america-mexico">
                        America/Mexico_City (GMT-6)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Moneda</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">Dolares ($)</SelectItem>
                      <SelectItem value="pen">Soles (S/)</SelectItem>
                      <SelectItem value="eur">Euros (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Store Settings */}
        <TabsContent value="store" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuracion de Productos</CardTitle>
              <CardDescription>
                Configura como se muestran los productos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mostrar productos agotados</p>
                  <p className="text-sm text-muted-foreground">
                    Los productos sin stock se mostraran como Agotado
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mostrar cantidad en stock</p>
                  <p className="text-sm text-muted-foreground">
                    Muestra cuantas unidades quedan disponibles
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Permitir resenas de productos</p>
                  <p className="text-sm text-muted-foreground">
                    Los clientes pueden dejar resenas en productos
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Envio</CardTitle>
              <CardDescription>Configura las opciones de envio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Costo de envio estandar ($)</Label>
                  <Input type="number" defaultValue="15" />
                </div>
                <div className="space-y-2">
                  <Label>Envio gratis desde ($)</Label>
                  <Input type="number" defaultValue="200" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones por Email</CardTitle>
              <CardDescription>
                Configura que notificaciones recibir
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Nuevos pedidos</p>
                  <p className="text-sm text-muted-foreground">
                    Recibe un email cuando hay un nuevo pedido
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Pagos fallidos</p>
                  <p className="text-sm text-muted-foreground">
                    Notificacion cuando un pago falla
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Stock bajo</p>
                  <p className="text-sm text-muted-foreground">
                    Alerta cuando un producto tiene poco stock
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Nuevos usuarios</p>
                  <p className="text-sm text-muted-foreground">
                    Notificacion cuando se registra un nuevo usuario
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments */}
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Metodos de Pago</CardTitle>
              <CardDescription>
                Habilita o deshabilita metodos de pago
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Tarjetas de credito/debito</p>
                  <p className="text-sm text-muted-foreground">
                    Visa, Mastercard, American Express
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Transferencia bancaria</p>
                  <p className="text-sm text-muted-foreground">
                    Bank transfers
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">PayPal</p>
                  <p className="text-sm text-muted-foreground">PayPal wallet</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Pago contra entrega</p>
                  <p className="text-sm text-muted-foreground">
                    El cliente paga al recibir el producto
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>
    </div>
  );
}
