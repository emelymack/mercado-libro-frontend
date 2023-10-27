import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  TestItem,
  getTestList,
  pingHealthCheck,
} from "../../services/HealthService";
import { getAllBooks } from "../../services/BookService";

const Health = () => {
  const [pingResult, setPingResult] = useState<string>();
  const [testList, setTestList] = useState<TestItem[]>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    pingHealthCheck()
      .then((response) => {
        setPingResult(response);
      })
      .catch((error) => {
        console.error("Error en pingHealthCheck:", error);
        setError(error.message);
      });

    getTestList()
      .then((response) => {
        setTestList(response);
      })
      .catch((error) => {
        console.error("Error en getTestList:", error);
        setError(error.message);
      });

    getAllBooks()
      .then((books) => {
        console.log("Lista de libros:", books);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de libros:", error);
      });
  }, []);

  return (
    <>
      <Text>Health</Text>
      {error !== "" && <Text>Error al hacer la solicitud: {error}</Text>}
      {testList &&
        testList.map((item) => (
          <Text key={item.id}>
            ID: {item.id}, Nombre: {item.name}
          </Text>
        ))}
      {pingResult !== null && <Text>Ping: {pingResult}</Text>}
    </>
  );
};

export default Health;
