import { Fragment } from 'react'
import ProductSize from './ProductSize'
import { Pattern } from './ProductDropDown'

export default function ProductAddForm() {
    return (
        <section className='grid grid-cols-2'>
            <form>
                <fieldset className='border'>
                    <div>
                        <legend>General information</legend>
                        <label htmlFor='name'>Product Name</label>
                        <input type="text" name='name' id='name' />
                        <label htmlFor="discription">Product Discription</label>
                        <textarea name='description' id='discription' />
                    </div>
                    <div className='border-2 border-red-400'>
                        <fieldset className='border'>
                            <legend>Size</legend>
                            <h6>Pick Available size</h6>
                            <ProductSize />
                        </fieldset>

                        <fieldset className='border'>
                            <legend>Gender</legend>
                            <h6>Pick Available Gender</h6>
                            <div className='flex items-center'>
                                {
                                    ["Male", "Female", "Unisex"].map((gender, index) => {
                                        return <Fragment key={gender + index}>

                                            <input type="radio" name='gender' value={gender} id={gender} key={index + gender}
                                                className='accent-primary size-4 ml-2'
                                            />
                                            <label className='ml-1' htmlFor={gender}>{gender}</label>
                                        </Fragment>
                                    })
                                }
                            </div>
                        </fieldset>

                    </div>

                    <fieldset>
                        <legend>Pricing And Stock</legend>
                        <div>
                            {
                                ["Cost Price", "Sell Price", "Stock", "Discount"].map((name, index) => {
                                    return <div key={index + name}>
                                        <label htmlFor={name}>{name}</label>
                                        <input type="text" name={name} id={name} />
                                    </div>
                                })
                            }
                        </div>
                    </fieldset>

                    <Pattern />
                    <div>
                        <label htmlFor="category">Category</label>
                        <h6>Product category</h6>
                        <input type="text" name="category" id='category' />
                    </div>
                </fieldset>
                <fieldset>


                </fieldset>

            </form>
        </section>
    )
}

// https://dribbble.com/shots/23726881-SalesSync-Dashboard-Sales-Marketing-Add-Product