'use client'

import { Cat, CircleFadingPlus, Home, Sandwich, Utensils } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'

// Menu items.
const items = [
  {
    title: 'Início',
    url: '/',
    icon: Home
  },
  {
    title: 'Produtos',
    url: '/produtos',
    icon: CircleFadingPlus
  },
  {
    title: 'Lanches',
    url: '/lanches',
    icon: Sandwich
  },
  {
    title: 'Pedidos',
    url: '/pedidos',
    icon: Utensils
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="flex justify-center bg-gray-400">
        <SidebarGroup className="flex items-center bg-gray-600 h-full">
          <SidebarGroupLabel className="text-blue-400 text-2xl font-semibold p-2 gap-2">
            Miau Lanches
            <Cat className="text-white" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex items-stretch justify-center text-white font-medium gap-4 mt-4">
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="border-gray-500 border-2 items-center justify-center"
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="flex items-center justify-center">
          <a
            href="https://brunohhomem.tech/"
            className="text-gray-600 font-extrabold"
            target="_blank"
          >
            @brunohhomem
          </a>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}
