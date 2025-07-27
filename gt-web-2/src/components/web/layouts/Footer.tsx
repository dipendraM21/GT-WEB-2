'use client'
import gtLogo from '@/../public/images/gt-logo.png'
import { navItems } from '@/utils/constant'
import { translation } from '@/utils/translation'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Paragraph, Text } from 'theme-ui'

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-30">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Top Footer Sections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <Link href="/admin-dashboard" className="logo">
            <Image src={gtLogo} alt="gtLogo" />
          </Link>

          <div className="pl-30 text-center">
            <Text
              variant="Maison20Medium125"
              color="grey_light"
              className="mb-3"
            >
              {translation?.GAYATRI_TRAVELS}
            </Text>
            <Box
              as="div"
              className="md: md:flex text-center flex-col gap-14 my-3"
            >
              {navItems?.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-decoration-none "
                >
                  <Text
                    sx={{
                      cursor: 'pointer',
                      position: 'relative',
                      color: 'grey_subtext',
                      fontSize: 14,
                      ':hover': { color: 'orange_500' },
                      '::after': {
                        content: '""',
                        display: 'block',
                        height: '2px',
                        width: '100%',
                        backgroundColor: '#ff7b00',
                        position: 'absolute',
                        bottom: '-4px',
                        left: '0',
                        opacity: 0,
                        transition: 'opacity 0.2s ease-in-out',
                      },
                      ':hover::after': { opacity: 1 },
                    }}
                    variant="Maison16Medium20"
                  >
                    {item.name}
                  </Text>
                </Link>
              ))}
            </Box>
          </div>

          <div>
            <Text
              variant="Maison20Medium125"
              color="grey_light"
              className="mb-3"
            >
              {translation?.PRODUCT_AND_SERVICES}
            </Text>
          </div>

          <div>
            <Text
              variant="Maison20Medium125"
              color="grey_light"
              className="mb-3"
            >
              {translation?.LETS_GET_CONNECTED}
            </Text>
            <div className="flex space-x-3">
              <a
                href="#"
                className="bg-blue-600 p-2 rounded-full hover:bg-blue-700"
              >
                <i className="fab fa-facebook-f text-white"></i>
              </a>
              <a
                href="#"
                className="bg-blue-400 p-2 rounded-full hover:bg-blue-500"
              >
                <i className="fab fa-twitter text-white"></i>
              </a>
              <a
                href="#"
                className="bg-blue-700 p-2 rounded-full hover:bg-blue-800"
              >
                <i className="fab fa-linkedin-in text-white"></i>
              </a>
              <a
                href="#"
                className="bg-red-600 p-2 rounded-full hover:bg-red-700"
              >
                <i className="fab fa-google-plus-g text-white"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <Paragraph color="grey_light" variant="Maison16Medium20">
            {translation?.COPYRIGHT_TEXT}
          </Paragraph>

          <div>
            <p>
              <strong>Contact Number:</strong> 8011112020
            </p>
            <p>
              <strong>Support Email ID:</strong> info@gayatritravels.in
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
