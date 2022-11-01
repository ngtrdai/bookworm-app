import React, { useState, useEffect } from "react";
import { Accordion } from 'react-bootstrap';
import { shopApi } from "../../../../services"
import { StringUtils } from "../../../../utils";
import "./style.scss";
function FilterBar({ params, setCategory, setAuthor, setRating }) {
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

    const handleFilter = (e, menuItem, menuName) => {
        // Get classname from e, if active set null
        const className = e.target.className;
        const activated = className.includes('active');

        if (menuName === 'Category') {
            !activated ? setCategory({id: menuItem.id, name: menuItem.category_name}) : setCategory({id: null, name: null});
        }
        if (menuName === 'Author') {
            !activated ? setAuthor({id: menuItem.id, name: menuItem.author_name}): setAuthor({id: null, name: null});
        }
        if (menuName === 'Rating Review') {
            !activated ? setRating(menuItem): setRating(null);
        }
    };

    return (
        <div className='shop__filterbar'>
            <h6>Filter By</h6>
            {
                filterMenuList.map((filterMenu, index) => (
                    <React.Fragment key={index}>
                        <Accordion className="shop__filtermenu mb-3">
                            <Accordion.Item>
                                <Accordion.Header className="shop__filtermenu__header">
                                    {filterMenu.menuName}
                                </Accordion.Header>
                                {
                                    filterMenu.menuItems.map((menuItem, index) => (
                                        <Accordion.Body key={index} 
                                            className={
                                                filterMenu.menuName === 'Rating Review' && menuItem == params.rating ? (
                                                    'shop__filtermenu__body--active'
                                                ) : (
                                                    filterMenu.menuName === 'Category' && menuItem.id == params.category ? (
                                                        'shop__filtermenu__body--active'
                                                    ) : (
                                                        filterMenu.menuName === 'Author' && menuItem.id == params.author ? (
                                                            'shop__filtermenu__body--active'
                                                        ) : (
                                                            'shop__filtermenu__body'
                                                )))}
                                            onClick={(e) => handleFilter(e, menuItem, filterMenu.menuName)}>
                                            {
                                                filterMenu.menuName === 'Rating Review' ? (
                                                    menuItem + ' Star'
                                                ) : (
                                                    filterMenu.menuName === 'Category' ? (
                                                        StringUtils.capitalizeWords(menuItem.category_name)
                                                    ) : (
                                                        menuItem.author_name
                                                    )
                                                )
                                            }
                                        </Accordion.Body>
                                    ))
                                }
                            </Accordion.Item>
                        </Accordion>
                    </React.Fragment>
                ))
            }
        </div>
    );
}

export default FilterBar;