import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Bath, BedDouble, CarFront } from 'lucide-react'

function FilterSection({ setBathCount, setBedCount, setParkingCount, setHomeType }) {
  return (
    <div className='px-3 py-2 grid grid-cols-2 md:flex gap-2'>
      
      {/* Bedroom Filter */}
      <Select onValueChange={(value) => setBedCount(Number(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Bed" />
        </SelectTrigger>
        <SelectContent>
          {[2, 3, 4, 5].map((num) => (
            <SelectItem key={num} value={String(num)}>
              <h2 className='flex gap-2'>
                <BedDouble className='h-5 w-5 text-primary' /> {num}+
              </h2>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Bathroom Filter */}
      <Select onValueChange={(value) => setBathCount(Number(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Bath" />
        </SelectTrigger>
        <SelectContent>
          {[2, 3, 4, 5].map((num) => (
            <SelectItem key={num} value={String(num)}>
              <h2 className='flex gap-2'>
                <Bath className='h-5 w-5 text-primary' /> {num}+
              </h2>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Parking Filter */}
      <Select onValueChange={(value) => setParkingCount(Number(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Parking" />
        </SelectTrigger>
        <SelectContent>
          {[1, 2, 3].map((num) => (
            <SelectItem key={num} value={String(num)}>
              <h2 className='flex gap-2'>
                <CarFront className='h-5 w-5 text-primary' /> {num}+
              </h2>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Home Type Filter */}
      <Select onValueChange={(value) =>
        value === 'All' ? setHomeType(null) : setHomeType(value)
      }>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Home Type" />
        </SelectTrigger>
        <SelectContent>
          {['All', 'Single Family House', 'Town House', 'Condo'].map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
    </div>
  )
}

export default FilterSection
