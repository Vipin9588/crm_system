import React from 'react'

export default function ProductSize() {
    return (
        <fieldset>
            <legend className="font-medium">Size</legend>

            <div className="flex gap-2 mt-3">
                {["XS", "S", "M", "XL", "XXL"].map((size) => (
                    <label
                        key={size}
                        className="cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            name="size"
                            value={size}
                            className="peer hidden"

                        />

                        <div
                            className="
            w-12 h-10
            rounded-md border
            flex items-center justify-center
            bg-muted
            peer-checked:bg-primary 
            peer-checked:text-white
            peer-checked:border--500
          "
                        >
                            {size}
                        </div>
                    </label>
                ))}
            </div>
        </fieldset>
    )
}
