import PDFDropZone from '@/components/PDFDropZone'

const Receipts = () => {
  return (
    <div className='container py-10 px-4 sm:px-6 lg:px-8 mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            <PDFDropZone />
            {/*<ReceiptsList /> */}
        </div>
    </div>
  )
}

export default Receipts