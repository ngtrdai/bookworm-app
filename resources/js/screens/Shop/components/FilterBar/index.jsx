import React, { useState, useEffect } from "react";
import { Accordion, Card, Button } from 'react-bootstrap';
import { shopApi } from "../../../../services"
import { useSelector, useDispatch } from "react-redux";
import { setCategory, setAuthor, setRating } from '../../../../reducers/filterBook';
import { StringUtils } from "../../../../utils";
import "./style.scss";
function FilterBar(){
    const dispatch = useDispatch();
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

    const params = useSelector(state => state.filterBookReducer.params);
    const handleFilter = (menuItem, menuName) => {
        if (menuName === 'Category') {
            dispatch(setCategory({id: menuItem.id, name: menuItem.category_name}));
        }
        if (menuName === 'Author') {
            dispatch(setAuthor({id: menuItem.id, name: menuItem.author_name}));
        }
        if (menuName === 'Rating Review') {
            dispatch(setRating(menuItem));
        }
    };

    return (
        <div className='shop__filterbar'>
            <h6>Filter By</h6>
            {
                filterMenuList.map((filterMenu, index) => (
                    <React.Fragment key={index}>
                        <Accordion className="shop__filtermenu">
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
                                            onClick={(e) => handleFilter(menuItem, filterMenu.menuName)}>
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