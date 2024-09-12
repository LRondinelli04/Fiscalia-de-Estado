# ProyectoMEV

- En este repositorio se verán los cambios y los códigos que realicé para poder notar el avance y la incorporación de los conocimientos adquiridos a lo largo de este proyecto.

## Wrapper de Buscador de Causas por ID de Organismo

- Este repositorio contiene el desarrollo de un wrapper que permite a los usuarios, a través de la aplicación miCartera, consultar causas utilizando palabras clave, como datos de persona + algo más (por ejemplo, "lopez juan alimentos"). La búsqueda se realiza en la carátula de la Mesa de Entrada Virtual (MEV), abarcando distintos fueros y juzgados, con el objetivo de identificar causas similares asociadas a determinadas personas.

## Problema

- Es posible que la contraparte haya ingresado una causa similar con sentencia en el pasado y, posteriormente, haya hecho lo mismo en otra causa, lo que podría resultar en el cobro doble por parte de dicha contraparte. Este proyecto busca mitigar este riesgo al facilitar la búsqueda de causas relacionadas.

## Funcionalidades

- **Búsqueda de causas**: Actualmente, existen endpoints que permiten acceder a la MEV y realizar búsquedas de causas.
- **Vinculación de causas**: Se propone agregar la funcionalidad de vincular causas en la MEV para mejorar la trazabilidad y la identificación de casos relacionados.