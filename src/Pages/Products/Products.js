import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import { Table, Container, Button } from "@themesberg/react-bootstrap";
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {API} from "../../config";
import { useSortBy, useTable } from "react-table";

const Products = (props) => {
  
  const [services, setServices] = useState([]);

  const loadServices = async () => {
    const response = await axios
      .get(`${API}/products`);

    if(response) {
      const services = response.data;

      console.log("Services: ", services);
      setServices(services);
    }
  };  

  const servicesData = useMemo(() => [...services], [services]);

  const servicesColumns = useMemo(() => 
    services[0] 
      ? Object.keys(services[0])
        .filter((key) => key !== "__v")
        .filter((key) => key !== "_id")
        .map((key) => {
          if (key === "category") {
            key = "category.name"
            return { Header: 'Category', accessor: key }
          }
          if (key === "ratePer1000") {
            return { Header: "Price Per 1000", accessor: key, Cell: ({value}) => <>₦ {value}</>}
          }
          if (key === "pricePerUnit") {
            return { Header: "Price Per Unit", accessor: key, Cell: ({value}) => <>₦ {value}</>}
          }
          if (key === "minOrder") {
            return { Header: "Minimum Order", accessor: key}
          }
          if (key === "maxOrder") {
            return { Header: "Maximum Order", accessor: key}
          }
          
          return { Header: key, accessor: key};
      })
     : [],
   [services]
  );

  const tableInstance = useTable({ columns: servicesColumns, data: servicesData }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance;

  useEffect(() => {
    loadServices();
  }, []);

  const goBack = () => (
    <div className="mt-5 mb-3 jusitfy-content-end">
        <Button href="/" variant="outline-secondary" size="sm" >
            Back to Homepage <FontAwesomeIcon icon={faHome}/>
        </Button>
    </div>
  );

  return (
    <Container fluid="md">
      {goBack()}
      Services
      <Table striped bordered responsive="sm" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                { column.render("Header") }
                {column.isSorted ? (column.isSortedDesc ? "↓" : "↑") : ''}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);

          return (
            <tr {...row.getRowProps()}>

              {row.cells.map((cell, index) => (
                <td {...cell.getCellProps()}>
                  { cell.render("Cell") }
                </td>
              ))}

            </tr>);
        })}
      </tbody>
    </Table>
    </Container>
  )

};

export default Products;