/* import { useEffect, useState } from "react";
import { obtenerProducto } from "../features/news/fakeRest";

export interface ICardProductos {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: number | string;
    esPremium: boolean;
    imagen: string;
    descripcionCorta?: string;
}

export const useProducto = () => {

    const [producto, setProducto] = useState<ICardProductos[]>([]);

    useEffect(() => {
        const obtenerInformacion = async () => {
          const respuesta = await obtenerProducto();
    
          const data = respuesta.map((n) => {
            const titulo = n.titulo
              .split(" ")
              .map((str) => {
                return str.charAt(0).toUpperCase() + str.slice(1);
              })
              .join(" ");
    
            const ahora = new Date();
            const minutosTranscurridos = Math.floor(
              (ahora.getTime() - n.fecha.getTime()) / 60000
            );
    
            return {
              id: n.id,
              titulo,
              descripcion: n.descripcion,
              fecha: `Hace ${minutosTranscurridos} minutos`,
              esPremium: n.esPremium,
              imagen: n.imagen,
              descripcionCorta: n.descripcion.substring(0, 100),
            };
          });
    
          setProducto(data);
        };
    
        obtenerInformacion();
      }, []);

      return producto; 
} */