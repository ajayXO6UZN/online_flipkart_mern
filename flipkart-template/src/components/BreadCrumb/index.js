import React from 'react';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';

const BreadCrumb = () => {

    const category = useSelector(state => state.allCategories.categories);
    const dispatch = useDispatch();
    

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.label}>
                    {
                        category.parentId ? <a
                            href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>
                            {category.label}
                        </a> :
                            <span>{category.label}</span>
                    }
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            );
        }
        return myCategories;
    }

    return (
        <>

            <div className='mainBreadcrumb'>
                <div className='breadHeader'>
                    <div className='bread_flex'>
                        <ul>
                            {category.length > 0 ? renderCategories(category) : null}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BreadCrumb