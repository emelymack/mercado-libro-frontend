/* import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Product } from "../types/product";


//ASYNC
/* export const apiCategory = async (name: string) => {
  const response = await fetch(`http://localhost:8080/v1/category/=${id}`);
  if(response.ok){
  const data = await response.json();
  return data.results
}else{
  throw new Error("No hay");
}
}

export const apiCategoryDetail = async (id: number) => {
  const response = await fetch(`http://localhost:8080/v1/category/=${id}`);
  if(response.ok){
  const data = await response.json();
  return data.results
}else{
  throw new Error("No hay");
}
}

export const apiSearchProduct = async (productName: string) => {
  const response = await fetch(`http://localhost:8080/v1/category/?name=${productName}`);
  if(response.ok){
  const data = await response.json();
  return data.results;
}else{
  throw new Error("No hay");
}
};

/* export const apiPaginas = async (page: number) => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
  const data= await response.json()
  return data.results
};



export const apiBuscarDetalle = async (id: number) => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const data= await response.json()
  return data.results
}; */


//CREATE THUNK
/* export const getCategory = createAsyncThunk(
  '/getCategory',
  async (info: string) => {
    const response = await apiCategory(info)
    return response
  }
)
 
export const getCategoryDetail = createAsyncThunk(
  '/getCategoryDetail',
  async (id: number) => {
    const response = await apiCategoryDetail(id)
    return response
  }
)
export const getSearchProduct = createAsyncThunk(
  '/getSearchProduct',
  async (productName: string) => {
    const response = await apiSearchProduct(productName)
    return response
  }
)
/*
export const getPaginas = createAsyncThunk (
  '/getPaginacion',
async (page: number) => {
  const response = await apiPaginas(page);
  return response
  }
);

export const getBuscarDetalle = createAsyncThunk(
  '/getBuscar',
  async (idPersonaje: number) => {
    const response = await apiBuscarDetalle(idPersonaje)
    return response
  }
); 


//Initial
interface InitialType {
  product: Product[],
  loading: boolean,
  searchProduct: string,

} 

const initialState: InitialType = {
  product: [],
  loading: false,
  searchProduct: "",
}


  export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
      actionSearchProduct: (state, action)=> {
        state.searchProduct = action.payload
      },
     /*  agregarFavorito: (state, action) => {
       state.Favorito.push(action.payload)
    },
    sacarFavorito: (state, action) => {
      state.Favorito = state.Favorito.filter((sacar) => sacar !== action.payload)
   },
    deletarTodosFavoritos: (state) => {
      state.Favorito = initialState.Favorito
    },
  },
        extraReducers: (builder)=> {

          builder.addCase(getSearchProduct.fulfilled, (state, action) => {
            state.searchProduct = action.payload
           })
          /*builder.addCase(getPaginas.fulfilled, (state, action) => {
            state.category = action.payload
          })
          
            builder.addCase(getBuscarDetalle.fulfilled, (state, action) => {
            state.tarjetas = action.payload
           })
           builder.addCase(getBuscarDetalle.rejected, (state, action) => {
            state.errorBuscar = action.error.message
           }) 
           
          
        }
  })



export const { actionSearchProduct} = productSlice.actions
export default productSlice.reducer



/* d: 1,
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
    origin: {
      name: "",
      url: "",
    },
    location: {
      name: "",
      url: "",
    },
    image: "",
    episode: [
      "",
      "",
    ],
    url: "",
    created: "", */

    /* import { getBuscar } from "../redux/personajeSlice";
import { Personaje } from "../types/types";

export const getPersonaje = async (): Promise<Personaje[]> => {
    const response = await fetch("https://rickandmortyapi.com/api/character/");
    const data = await response.json();
    return data.results;
};

export const buscarPokemons = async (personajeName: string): Promise<Personaje[]> => {
    const data = await getPersonaje();
    return data.filter(personaje => personaje.name.toLowerCase().match(personajeName.toLowerCase()));
};
 */
/* export const getPokemon = async (page: number): Promise<Personaje[]> => {
     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${page}/`);
     return await response.json();
}; */ 