import axios from 'axios';

const apiUrl = 'http://localhost:3000';

let cachedData = [];
let cachedResource = null;

const getList = async (resource, params) => {
    if (resource !== cachedResource) {
        cachedData = [];
        cachedResource = resource;
    }

    if (cachedData.length === 0) {
        try {
            const response = await axios.get(`${apiUrl}/${resource}`, { timeout: 5000 });
            
            if (response.status !== 200) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            let idField = `${resource.replace(/s$/, "").split("_")[0]}_id`;
            if (resource === "accounts") {
                idField = "acc_id";
            }

            cachedData = response.data.map(item => ({
                ...item,
                id:item[idField]
            })); 
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error('Failed to fetch data');
        }
    }

    const { field, order } = params.sort;

    const sortedData = cachedData.sort((a, b) => {
        const aValue = isNaN(a[field]) ? a[field] : Number(a[field]); 
        const bValue = isNaN(b[field]) ? b[field] : Number(b[field]);

        if (aValue < bValue) return order === 'ASC' ? -1 : 1;
        if (aValue > bValue) return order === 'ASC' ? 1 : -1;
        return 0;
    });

    const { page, perPage } = params.pagination;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedData = sortedData.slice(start, end); 

    return {
        data: paginatedData,
        total: sortedData.length,
    };
};

const getOne = async (resource, params) => {
    let idField = `${resource.replace(/s$/, "").split("_")[0]}_id`;
    if (resource === "accounts") {
        idField = "acc_id";
    }
    const itemId = params.data?.[idField] || params.id;

    try {
        const response = await axios.get(`${apiUrl}/${resource}/${itemId}`, { timeout: 5000 });
        
        if (response.status !== 200) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        return { data: { ...response.data, id: response.data[idField] } };
    } catch (error) {
        console.error("Error fetching item for editing:", error);
        throw new Error("Failed to fetch item for editing");
    }
};

const create = async (resource, params) => {
    let idField = `${resource.replace(/s$/, "").split("_")[0]}_id`;
    try {
        const response = await axios.post(`${apiUrl}/${resource}`, params.data, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 6000,
        });

        if (response.status !== 200) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        
        return { data: { ...response.data, id: response.data[idField] } };
    } catch (error) {
        console.error('Error creating item:', error); 
        if (error.response) {
            console.error('Error details:', error.message);
        }

        throw new Error('Failed to create item. Please try refreshing the page');
    }
};

const update = async (resource, params) => {
    let idField = `${resource.replace(/s$/, "").split("_")[0]}_id`;
    if (resource === "accounts") {
        idField = "acc_id";
    }
    const itemId = params.data?.[idField] || params.id;
    try {
        const response = await axios.put(
            `${apiUrl}/${resource}/${itemId}`, 
            params.data, 
            { timeout: 6000 }
        );
        
        if (response.status !== 200) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        const updatedResponse = await axios.get(
            `${apiUrl}/${resource}/${itemId}`, 
            { timeout: 6000 }
        );

        return { data: updatedResponse.data };
    } catch (error) {
        console.error("Error updating item:", error);
        throw new Error("Failed to update item");
    }
};


const deleteOne = async (resource, params) => {
    let idField = `${resource.replace(/s$/, "").split("_")[0]}_id`;
    const itemId = params.data?.[idField] || params.id;

    try {
        const response = await axios.delete(
            `${apiUrl}/${resource}/${itemId}`,
            { timeout: 5000 }
        );

        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        cachedData = cachedData.filter(item => item.id !== itemId);

        return { data: params.previousData };
    } catch (error) {
        console.error('Error deleting one item:', error);
        throw new Error(`Failed to delete item: ${error.message}`);
    }
};



const deleteMany = async (resource, params) => {

    try {
        const responses = await Promise.all(
            params.ids.map(id =>
                axios.delete(`${apiUrl}/${resource}/${id}`, { timeout: 5000 })
            )
        );

        responses.forEach(response => {
            if (response.status < 200 || response.status >= 300) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
        });

        cachedData = cachedData.filter(item => !params.ids.includes(item.id));

        return { data: params.ids };
    } catch (error) {
        console.error('Error deleting multiple items:', error);
        throw new Error('Failed to delete multiple items');
    }
};


const dataProvider = {
    getList,
    getOne,
    create,
    update,
    delete: deleteOne,
    deleteMany,
};

export { dataProvider };
