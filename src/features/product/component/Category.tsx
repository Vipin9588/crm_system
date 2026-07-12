import React from "react";

export default function Category({ categoryList, setFieldValue, setopenDrop, setCategory }: {
    categoryList: string[] | null,
    setFieldValue: (c: string, v: string) => void
    setopenDrop: React.Dispatch<React.SetStateAction<boolean>>
    setCategory: React.Dispatch<React.SetStateAction<string>>
}) {


    return (
        <ol className="absolute mt-2 z-4 bg-background w-64"  >
            {
                categoryList?.map((c, index) => {
                    return <li key={index + c} className="p-1 cursor-pointer" onClick={() => {
                        setFieldValue("category", c);
                        setCategory(c)
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


}