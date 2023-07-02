import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  const [name, setName] = useState('John')
  const [title, setTitle] = useState('CEO')
  const [status, setStatus] = useState('Active')
  

  return (
    <div>
      <div class="flex flex-col text-center">
        <h1 className='text-base mt-10 mb-2'>STAKED AMOUNT</h1>
        <h1 className='text-5xl mb-10'>4 SNX</h1>
      </div>
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto mx-10">
          <div class="py-2 align-middle inline-block min-w-full">
            <div class="shadow overflow-hidden border-b border-pur sm:rounded-lg">
              <table class="min-w-full divide-y divide-pur">
                <thead class="bg-pur">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Insurance Type</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date of Applying</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Amount</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Mine sUSD</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">

                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">Life Insurance</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">12/12/2020</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      1000 SNX
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      1000 sUSD
                    </td>
                  </tr>

                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard; 