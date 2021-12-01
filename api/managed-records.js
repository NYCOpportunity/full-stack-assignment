import fetch from "../util/fetch-fill.js";
import URI from "urijs";

// /records endpoint
window.path = "http://localhost:3000/records";

// Your retrieve function plus any additional functions go here ...

const configGenerater = (params, colors) => {
    const limit = 10;
  
    const page = params.page || 1;
    const offset = page === 1 ? 0 : (page - 1) * limit;
    const colorFilter = params.colors || [];
  
    return {
      page,
      limit: limit,
      offset,
      colorFilter,
      colors,
    };
  }

const getRecords = (config) => {
    let records = [];
    fetch(constructUri(config))
        .then(res => res.json())
        .then(r => {
            records = r
        })
        .catch((error) => {
            console.log(error)
            return;
        });

    return records;
  }

const constructUri = (config) => {
    const queryParams = {
      limit: config.limit + 1,
      offset: config.offset,
    };

    if (config.colorFilter) {
        queryParams['color[]'] = config.colorFilter;
    }

    return URI(window.path).query(queryParams).toString();
}

const retrieve = (params = {page: 2, colors: ["red", "brown"] }) => {
    const colors = ['green', 'brown', 'red'];
    const colorRange = [...colors, 'brown', 'green'];

    const config = configGenerater(params, colors);

    let items = [];

    if (!(config.colorFilter.length === 1 && !colorRange.includes(config.colorFilter[0]))) {
        items = getRecords(config);
        console.log(items)
      }
    
    return items
}

retrieve()

export default retrieve;

