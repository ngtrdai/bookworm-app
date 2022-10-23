import { useState, useEffect } from "react";
import FilterMenu from "./FilterMenu";
import shopApi from "../../../../api/shopApi";
function FilterBar(){
    const [filterMenuList, setFilterMenuList] = useState([
        {
            id: 1,
            menuName: 'Category',
            menuItems: []
        },
        {
            id: 2,
            menuName: 'Author',
            menuItems: []
        },
        {
            id: 3,
            menuName: 'Rating Review',
            menuItems: []
        }
    ]);
    const ratingReview = [5, 4, 3, 2, 1];
    useEffect(() => {
        const fetchFiltersMenu = async () => {
            try {
                const response = await shopApi.getListFiltering();
                setFilterMenuList([
                    {
                        menuName: 'Category',
                        menuItems: response.data.categories,
                    },
                    {
                        menuName: 'Author',
                        menuItems: response.data.authors,
                    },
                    {
                        menuName: 'Rating Review',
                        menuItems: ratingReview,
                    }
                ])
            } catch (error) {
                console.log('Failed to fetch filter menu list: ', error);
            }
        }
        fetchFiltersMenu();
    }, []);
    console.log(filterMenuList);
    return (
        <div className='shop__filterbar'>
            <div className='shop__filterbar__title'>
                <h6>Filter By</h6>
                {
                    filterMenuList.map((filterMenu, index) => (
                        <FilterMenu key={index} menuName={filterMenu.menuName} menuItems={filterMenu.menuItems} />
                    ))
                }
            </div>
        </div>
    );
}

export default FilterBar;