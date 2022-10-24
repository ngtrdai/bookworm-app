import React from "react";
import {Accordion, Card, Button} from 'react-bootstrap';
import "./style.scss";
function FilterMenu({ menuName, menuItems }) {
    return (
        <div>
            <Accordion className="shop__filtermenu">
                <Accordion.Item>
                    <Accordion.Header className="shop__filtermenu__header">
                        {menuName}
                    </Accordion.Header>
                    {
                        menuItems.map((menuItem, index) => (
                            <Accordion.Body key={index} className="shop__filtermenu__body">
                                {
                                    menuName === 'Rating Review' ? (
                                        menuItem + ' Star'
                                    ) : (
                                        menuName === 'Category' ? (
                                            menuItem.category_name
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
        </div>
    );
}

export default FilterMenu;