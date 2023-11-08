import { Card, CardBody, Stack, Heading, Box, CardHeader, Text, Icon } from '@chakra-ui/react'
import { Title } from '../Title'

interface Props {
  iconPath: string,
  iconViewbox: string,
  title: string,
  text: string,
  px?: number
}
const IconCard = ({iconPath, title, text, iconViewbox, px}: Props) => {
  return (
    <Card variant={'iconCard'} w={'auto'} px={px}>
      <CardHeader display={'flex'} justifyContent={'center'} pb={0}>
        <Box backgroundColor={'brand.blueLogo'} p={6} borderRadius={'full'} w={'fit-content'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Icon boxSize={12} viewBox={iconViewbox} color='brand.violetLogo'>
            <path
              fill='currentColor'
              d={iconPath}
            />
          </Icon>
        </Box>
      </CardHeader>
      <CardBody px={10}>
        <Stack mt='1' spacing='1'>
          <Title 
            size={'md'}
            text={title}
            align={'center'}
          />
          <Text fontSize={'sm'} noOfLines={3} textAlign={'center'} mt={1}>{text}</Text>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default IconCard