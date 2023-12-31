import { Input } from '@chakra-ui/react'
import { Controller, Control } from "react-hook-form";

interface Props {
  name: string,
  type?: string,
  placeholder: string,
  autoComplete?: string,
  value?: string | number,
  control?: Control<any>,
  [x:string]: any
}
const CustomInput = ({control, name, type, placeholder, autoComplete, value, ...otherProps}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <Input
          {...field}
          py={3}
          fontSize={{ base: "lg", md: "xl" }}
          h={"auto"}
          placeholder={placeholder}
          type={type ?? 'text'}
          bg={'brand.violetLogo50'}
          color="#003844"
          borderColor="#d8dee4"
          fontWeight={500}
          size="sm"
          ps={5}
          borderRadius="8px"
          autoComplete={autoComplete}
          _placeholder={{ color: "brand.blueLogo",  }}
          {...otherProps}
          _disabled={{opacity: .7}}
          value={value}
        />
      )}
    />
  )
}

export default CustomInput