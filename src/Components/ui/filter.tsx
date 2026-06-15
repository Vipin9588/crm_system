type filterListProps = {
    filterList: string[];
    setFilter: React.Dispatch<React.SetStateAction<string | null>>
}

export default function Filter({ filterList, setFilter }: filterListProps) {

    return (

        <select name="product_fillter" id="product_fillter" className="w-[100px] md:w-[150px] lg:[200px] border  rounded-sm"
            onChange={(e) => setFilter(e.target.value)}
        >
            {
                filterList.map((name) => {
                    return <option value={name} className="p-4" >{name}</option>
                })

            }
        </select>
    )
}
