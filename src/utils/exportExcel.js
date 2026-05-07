import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

export const exportExcel = (transactions) => {

  const formatted = transactions.map(item => ({
    Nama: item.name,
    Tanggal: item.date,
    Tipe: item.type,
    Jumlah: `Rp ${Number(item.amount).toLocaleString("id-ID")}`
  }))

  const worksheet =
    XLSX.utils.json_to_sheet(formatted)

  const workbook =
    XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Transactions"
  )

  const excelBuffer = XLSX.write(
    workbook,
    {
      bookType: "xlsx",
      type: "array"
    }
  )

  const blob = new Blob(
    [excelBuffer],
    {
      type:
        "application/octet-stream"
    }
  )

  saveAs(blob, "transactions.xlsx")
}