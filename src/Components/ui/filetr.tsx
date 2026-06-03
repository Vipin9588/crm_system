type filterListProps = {
    filterList: string[];
}

export default function Filter({ filterList }: filterListProps) {

    return (

        <select name="product_fillter" id="product_fillter" className="w-[100px] md:w-[150px] lg:[200px] border  rounded-sm">
            {
                filterList.map((name) => {
                    return <option value={name} className="p-4">{name}</option>
                })
            }
        </select>
    )
}
