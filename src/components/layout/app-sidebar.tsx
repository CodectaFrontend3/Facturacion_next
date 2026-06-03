"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import sidebarData from "@/data/sidebar.json"
import type { sidebarItem } from "@/types/sidebar/sidebar"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem,
	SidebarMenuSubButton,
	useSidebar,
} from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const iconMap: Record<string, string> = {
	Home: "fa fa-fw fa-home",
	Tags: "fa fa-fw fa-tags",
	Wallet: "fa fa-fw fa-money",
	MessageCircle: "fa fa-fw fa-comments",
	FileText: "fa fa-fw fa-file",
	ShieldCheck: "fa fa-fw fa-check",
	Archive: "fa fa-fw fa-archive",
	CreditCard: "fa fa-fw fa-credit-card",
	Wrench: "fa fa-fw fa-wrench",
	Sheet: "fa fa-fw fa-table",
	Handbag: "fa fa-fw fa-shopping-bag",
	BadgeCheck: "fa fa-fw fa-registered",
	Mail: "http://jypsac.dyndns.org:190/facturacion_20522045773/public/archivos/imagenes/layout/correo.svg",
	Users: "http://jypsac.dyndns.org:190/facturacion_20522045773/public/archivos/imagenes/layout/auxiliar.svg"
}

const isUrl = (str: string) => /^(https?:\/\/|\/)/.test(str) || str.endsWith(".svg")

const mainItems = sidebarData as sidebarItem[]

function isActiveRoute(pathname: string, href: string) {
	if (href === "/") {
		return pathname === "/"
	}

	return pathname === href || pathname.startsWith(href + "/")
}

function getActiveMenuLabel(pathname: string, items: sidebarItem[]) {
	const activeItem = items.find(item => {
		if (item.path) return isActiveRoute(pathname, item.path)
		if (item.subPath) return item.subPath.some(sub => {
			if (sub.path) return isActiveRoute(pathname, sub.path)
			if (sub.kPath) return sub.kPath.some(k => isActiveRoute(pathname, k.path))
			return false
		})
		return false
	})

	return activeItem && activeItem.subPath ? activeItem.label : null
}

export default function AppSidebar() {
	const pathname = usePathname()
	const [openMenuState, setOpenMenuState] = useState<{ pathname: string; label: string | null } | null>(null)
	const { state, setOpen } = useSidebar()
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	const handleMouseEnter = () => {
		if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
		setOpen(true)
	}

	const handleMouseLeave = () => {
		hoverTimeoutRef.current = setTimeout(() => {
			setOpen(false)
		}, 250)
	}

	const activeMenuLabel = getActiveMenuLabel(pathname, mainItems)
	const resolvedOpenMenu = openMenuState && openMenuState.pathname === pathname
		? openMenuState.label
		: activeMenuLabel

	return (
		<Sidebar
			collapsible="icon"
			className="border-none bg-[#1538A0] top-16 h-[calc(100svh-4rem)]"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
				{/* Navigation */}
				<SidebarContent className="relative z-10 flex-1 overflow-hidden px-0">
					<ScrollArea className="h-full">
						<SidebarMenu className="gap-0 py-0">
							{mainItems.map((item) => {
								const active = item.path
									? isActiveRoute(pathname, item.path)
									: item.subPath?.some((sub) => {
										if (sub.path) return isActiveRoute(pathname, sub.path)
										if (sub.kPath) return sub.kPath.some((k) => isActiveRoute(pathname, k.path))
										return false
									})
								const iconClass = iconMap[item.icon] ?? "fa fa-fw fa-file-text-o"

								if (item.subPath) {
									return (
										<Collapsible
											key={item.label}
											open={resolvedOpenMenu === item.label}
											onOpenChange={(isOpen) => setOpenMenuState({ pathname, label: isOpen ? item.label : null })}
											className="group/collapsible transition-all duration-200 data-[state=open]:bg-[#143593] group-data-[collapsible=icon]:data-[state=open]:bg-transparent"
										>
											<SidebarMenuItem>
												<CollapsibleTrigger asChild>
													<SidebarMenuButton
														isActive={active}
														className={`
															group relative flex h-11.5 w-full items-center gap-3 rounded-none border-none px-6 text-[12px] font-bold tracking-wide text-white transition-all duration-500 ease-in-out
															group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center
															hover:bg-[#09267B] hover:text-white cursor-pointer
															group-data-[state=open]/collapsible:shadow-[inset_4px_0_0_0_white]
															data-[active=true]:text-white data-[active=true]:shadow-[inset_4px_0_0_0_white]
															group-data-[state=closed]/collapsible:data-[active=true]:bg-[#09267B]
															group-data-[collapsible=icon]:data-[active=true]:bg-[#09267B]
														`}
													>
														{isUrl(iconClass) ? (
															<Image
																src={iconClass}
																alt={item.label}
																width={20}
																height={22}
																className="shrink-0 transition-all duration-500 ease-in-out object-contain group-data-[collapsible=icon]:w-5 group-data-[collapsible=icon]:h-5.5"
															/>
														) : (
															<i className={`${iconClass} flex! items-center! justify-center! shrink-0 transition-all duration-500 ease-in-out w-4 h-4.25 text-[17px]! group-data-[collapsible=icon]:w-4.5 group-data-[collapsible=icon]:h-5.25 group-data-[collapsible=icon]:text-[21px]!`} />
														)}
														<span className="text-[12px] font-bold tracking-wide text-white truncate transition-all duration-500 ease-in-out overflow-hidden group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0">
															{item.label}
														</span>
													</SidebarMenuButton>
												</CollapsibleTrigger>
												<CollapsibleContent className="overflow-hidden data-[state=closed]:animate-[collapsible-up_0.2s_ease-out] data-[state=open]:animate-[collapsible-down_0.2s_ease-out]">
													<SidebarMenuSub className="m-0 p-0 gap-0 border-none space-y-0 flex-col translate-x-0 mx-0 px-0">
														{item.subPath.map((subItem) => {
															const subActive = subItem.path
																? isActiveRoute(pathname, subItem.path)
																: subItem.kPath?.some((k) => isActiveRoute(pathname, k.path))
															return (
																subItem.kPath ? (
																	<Collapsible key={subItem.label} className="group/subcollapsible transition-all duration-200">
																		<SidebarMenuSubItem>
																			<CollapsibleTrigger asChild>
																				<SidebarMenuSubButton
																					isActive={subActive}
																					className={`
																						group relative flex h-10 w-full items-center gap-3 rounded-none border-none pl-11 pr-6 text-[12px] font-bold tracking-wide text-white transition-all duration-200
																						hover:bg-[#09267B] hover:text-white cursor-pointer
																						shadow-[inset_4px_0_0_0_white] translate-x-0
																						data-[active=true]:text-white
																						group-data-[state=closed]/subcollapsible:data-[active=true]:bg-[#09267B]
																					`}
																				>
																					<span className="truncate text-[12px] font-bold tracking-wide text-white">{subItem.label}</span>
																				</SidebarMenuSubButton>
																			</CollapsibleTrigger>
																			<CollapsibleContent className="overflow-hidden data-[state=closed]:animate-[collapsible-up_0.2s_ease-out] data-[state=open]:animate-[collapsible-down_0.2s_ease-out]">
																				<ul className="m-0 p-0 gap-0 border-none space-y-0 flex flex-col">
																					{subItem.kPath.map((kItem) => {
																						const kActive = isActiveRoute(pathname, kItem.path)
																						return (
																							<li key={kItem.label}>
																								<SidebarMenuSubButton
																									asChild
																									isActive={kActive}
																									className={`
																										group relative flex h-10 w-full items-center gap-3 rounded-none border-none pl-16 pr-6 text-[12px] font-bold tracking-wide text-white transition-all duration-200
																										hover:bg-[#09267B] hover:text-white
																										shadow-[inset_4px_0_0_0_white] translate-x-0
																										data-[active=true]:bg-[#09267B] data-[active=true]:text-white
																									`}
																								>
																									<Link href={kItem.path}>
																										<span className="truncate text-[12px] font-bold tracking-wide text-white">{kItem.label}</span>
																									</Link>
																								</SidebarMenuSubButton>
																							</li>
																						)
																					})}
																				</ul>
																			</CollapsibleContent>
																		</SidebarMenuSubItem>
																	</Collapsible>
																) : (
																	<SidebarMenuSubItem key={subItem.label}>
																		<SidebarMenuSubButton
																			asChild
																			isActive={subActive}
																			className={`
																				group relative flex h-10 w-full items-center gap-3 rounded-none border-none pl-11 pr-6 text-[12px] font-bold tracking-wide text-white transition-all duration-200
																				hover:bg-[#09267B] hover:text-white
																				shadow-[inset_4px_0_0_0_white] translate-x-0
																				data-[active=true]:bg-[#09267B] data-[active=true]:text-white
																			`}
																		>
																			<Link href={subItem.path!}>
																				<span className="truncate text-[12px] font-bold tracking-wide text-white">{subItem.label}</span>
																			</Link>
																		</SidebarMenuSubButton>
																	</SidebarMenuSubItem>
																)
															)
														})}
													</SidebarMenuSub>
												</CollapsibleContent>
											</SidebarMenuItem>
										</Collapsible>
									)
								}

								return (
									<SidebarMenuItem key={item.label}>
										<SidebarMenuButton
											asChild
											isActive={active}
											className={`
												group relative flex h-11.5 w-full items-center gap-3 rounded-none border-none px-6 text-[12px] font-bold tracking-wide text-white transition-all duration-500 ease-in-out
												group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center
												hover:bg-[#09267B] hover:text-white
												data-[active=true]:bg-[#09267B] data-[active=true]:text-white data-[active=true]:shadow-none
											`}
										>
											<Link href={item.path!}>
												{isUrl(iconClass) ? (
													<Image
														src={iconClass}
														alt={item.label}
														width={16}
														height={17}
														className="shrink-0 transition-all duration-500 ease-in-out w-4 h-4.25 object-contain group-data-[collapsible=icon]:w-4.5 group-data-[collapsible=icon]:h-5.25"
													/>
												) : (
													<i className={`${iconClass} flex! items-center! justify-center! shrink-0 transition-all duration-500 ease-in-out w-4 h-4.25 text-[17px]! group-data-[collapsible=icon]:w-4.5 group-data-[collapsible=icon]:h-5.25 group-data-[collapsible=icon]:text-[21px]!`} />
												)}
												<span className="text-[12px] font-bold tracking-wide text-white truncate transition-all duration-500 ease-in-out overflow-hidden group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0">
													{item.label}
												</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</ScrollArea>
				</SidebarContent>

				{/* Footer: User Info */}
				<SidebarFooter className="relative z-10 p-3 bg-[#1538A0] overflow-hidden">
					<div className="flex w-59 items-center gap-3 px-2 py-2 text-left text-white transition-all duration-500 ease-in-out group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:invisible">
						<Avatar size="lg" className="ring-2 ring-white/20">
							<AvatarImage src="" alt="Demo" />
							<AvatarFallback className="bg-white/15 text-[14px] font-bold tracking-wide text-white">
								DW
							</AvatarFallback>
						</Avatar>
						<div className="flex-1 min-w-0 flex flex-col gap-0.5">
							<p className="text-[12px] font-bold tracking-wide text-white truncate">
								Demo
							</p>
							<p className="text-[11px] font-bold tracking-wide truncate text-white/90">
								Administrador Web
							</p>
						</div>
						<DropdownMenu modal={false} open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
							<DropdownMenuTrigger asChild>
								<button
									type="button"
									className="rounded-md p-1.5 transition-colors hover:bg-white/10 focus:outline-none"
								>
									<i className="fa fa-ellipsis-v text-[14px] shrink-0 text-white w-4 h-4 flex items-center justify-center" />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								align="end"
								sideOffset={8}
								className={`w-38 bg-white text-black border-gray-200 p-1 ${state === "collapsed" ? "hidden" : ""}`}
							>
								<DropdownMenuItem className="text-[12px] font-bold px-3 py-1.5 transition-all duration-200 hover:pl-4 focus:pl-4 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer text-black">
									<i className="fa fa-user-circle-o mr-2 text-[14px] text-black w-3.5 h-3.5 flex items-center justify-center" />
									Mi Perfil
								</DropdownMenuItem>
								<DropdownMenuItem className="text-[12px] font-bold px-3 py-1.5 transition-all duration-200 hover:pl-4 focus:pl-4 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer text-black">
									<i className="fa fa-university mr-2 text-[14px] text-black w-3.5 h-3.5 flex items-center justify-center" />
									Mi Empresa
								</DropdownMenuItem>
								<DropdownMenuItem className="text-[12px] font-bold px-3 py-1.5 transition-all duration-200 hover:pl-4 focus:pl-4 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer text-black">
									<i className="fa fa-cog mr-2 text-[14px] text-black w-3.5 h-3.5 flex items-center justify-center" />
									Configuración
								</DropdownMenuItem>
								<DropdownMenuItem className="text-[12px] font-bold px-3 py-1.5 transition-all duration-200 hover:pl-4 focus:pl-4 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer text-black">
									<i className="fa fa-sign-out mr-2 text-[14px] text-black w-3.5 h-3.5 flex items-center justify-center" />
									Cerrar Sesión
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</SidebarFooter>
			</Sidebar>
	)
}