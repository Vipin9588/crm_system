import React from "react";

export default function Category({ ref, categoryList, setFieldValue, setopenDrop }: {
    categoryList: string[] | null,
    setFieldValue: (c: string, v: string) => void
    setopenDrop: React.Dispatch<React.SetStateAction<boolean>>
    ref: React.RefObject<HTMLOListElement | null>
}) {

    const close = () => {

    }

    return (
        <ol className="border border-red-400 p-2 absolute z-4 bg-background" ref={ref}>
            {
                categoryList?.map((c, index) => {
                    return <li key={index + c} className="p-1 cursor-pointer" onClick={() => {
                        setFieldValue("category", c);
                        setopenDrop(false)
                    }}>{c}</li>
                })
            }
        </ol>
    )
}



export const searchCategory = (e: React.ChangeEvent<HTMLInputElement>, allList: string[], setCategoryList: React.Dispatch<React.SetStateAction<string[] | null>>,
    timeoutRef: React.RefObject<ReturnType<typeof setTimeout> | null>,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void

) => {

    handleChange(e)
    let searched = e.target.value.toLowerCase()
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
        const list = allList?.filter((value, index) => {

            if (value.toLowerCase().includes(searched)) {
                return value;
            }
        })
        setCategoryList(list);
    }, 100)
    console.log("serach element ", searched)


}