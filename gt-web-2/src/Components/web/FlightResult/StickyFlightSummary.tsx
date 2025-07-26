'use client'
import React from 'react'
import { Box, Button, Text } from 'theme-ui'

const StickyFlightSummary = ({ price = '₹7,823', onClickBook }: { price?: string, onClickBook: () => void }) => {
    return (
        <Box
            className='container'
            sx={{
                position: 'fixed',
                bottom: 0,
                backgroundColor: 'white',
                borderTop: '1px solid #ddd',
                zIndex: 50,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 -2px 8px rgba(0,0,0,0.05)',
                width: '100%'
            }}
        >
            <Box>
                <Text sx={{ fontWeight: 500 }}>IndiGo • 06:00 → 08:10</Text>
                <Text sx={{ fontSize: 1, color: 'gray' }}>Return: 23:45 → 02:00 +1</Text>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Text sx={{ fontWeight: 600, fontSize: 3, color: 'primary' }}>{price}</Text>
                <Button onClick={onClickBook} sx={{ bg: 'primary' }}>
                    Book
                </Button>
            </Box>
        </Box>
    )
}

export default StickyFlightSummary
