
    export const fetchPokemonData = async(category: string, query: string) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/${category}/${query}`);

            if(!response.ok) {
                throw new Error(`HTTP Error Occurred! Status: ${response.status}`);

            
            }
            const responseData = await response.json();
            return responseData;
        } catch (error){
            console.error("Error fetching data: " + error);
            throw error;
        }
    }