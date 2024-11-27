'use client'

import { Cat, CircleFadingPlus, Home, Sandwich, Utensils } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
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
    url: '#',
    icon: Sandwich
  },
  {
    title: 'Pedidos',
    url: '#',
    icon: Utensils
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-red-500 text-lg font-semibold p-2 gap-2">
            <Cat /> Miau Lanches <Cat />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="">
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
      </SidebarContent>
    </Sidebar>
  )
}
