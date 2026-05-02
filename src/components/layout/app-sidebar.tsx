"use client"

import { useState, useEffect, useRef, type ComponentType, type CSSProperties, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
	BadgeCheck,
	Boxes,
	ClipboardList,
	CreditCard,
	FileText,
	Home,
	LogOut,
	Mail,
	MoreVertical,
	PackageSearch,
	Settings2,
	ShieldCheck,
	Stethoscope,
	Tag,
	User,
	Users,
	CircleUserRound,
	Wallet,
	Landmark
} from "lucide-react"
import sidebarData from "@/data/sidebar.json"
import type { sidebarItem } from "@/types/sidebar/sidebar"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarMenuSub,
	SidebarMenuSubItem,
	SidebarMenuSubButton,
	SidebarInset,
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
import LeonosoftLogo from "@/assets/img/Leonosoft.png"

type IconComponent = ComponentType<{ className?: string; strokeWidth?: number }>

const iconMap: Record<string, IconComponent> = {
	Home,
	Tag,
	Wallet,
	FileText,
	ShieldCheck,
	Boxes,
	CreditCard,
	Stethoscope,
	Users,
	PackageSearch,
	BadgeCheck,
	ClipboardList,
	Mail,
}

const mainItems = sidebarData as sidebarItem[]

function isActiveRoute(pathname: string, href: string) {
	if (href === "/") {
		return pathname === "/"
	}

	return pathname === href || pathname.startsWith(href + "/")
}

export default function AppSidebar({ children }: { children?: ReactNode }) {
	const pathname = usePathname()
	const [openMenu, setOpenMenu] = useState<string>("")
	const [isHovered, setIsHovered] = useState(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	const handleMouseEnter = () => {
		if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
		setIsHovered(true)
	}

	const handleMouseLeave = () => {
		hoverTimeoutRef.current = setTimeout(() => {
			setIsHovered(false)
		}, 250)
	}

	useEffect(() => {
		const activeItem = mainItems.find(item => {
			if (item.path) return isActiveRoute(pathname, item.path);
			if (item.subPath) return item.subPath.some(sub => {
				if (sub.path) return isActiveRoute(pathname, sub.path)
				if (sub.kPath) return sub.kPath.some(k => isActiveRoute(pathname, k.path))
				return false;
			});
			return false;
		});
		if (activeItem && activeItem.subPath) {
			setOpenMenu(activeItem.label);
		}
	}, [pathname]);

	return (
		<SidebarProvider
			open={isHovered}
			onOpenChange={setIsHovered}
			style={{ "--sidebar-width": "260px" } as CSSProperties}
		>
			<Sidebar
				collapsible="icon"
				className="relative h-svh border-none bg-[#1538A0]"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				{/* Header: Logo + Brand */}
				<SidebarHeader className="relative z-10 flex flex-row items-center justify-center gap-1 py-5 bg-white transition-all duration-500 ease-in-out group-data-[collapsible=icon]:px-0">
					<Image
						src={LeonosoftLogo}
						alt="Leonosoft Logo"
						width={56}
						height={56}
						className="drop-shadow-sm transition-all duration-500 ease-in-out"
					/>
					<h1 className="text-[16px] font-extrabold tracking-wide transition-all duration-500 ease-in-out overflow-hidden group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0">
						<span className="text-[#3252A4]">LEONO</span>
						<span className="text-gray-500">SOFT</span>
					</h1>
				</SidebarHeader>

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
								const Icon = iconMap[item.icon] ?? FileText

								if (item.subPath) {
									return (
										<Collapsible
											key={item.label}
											open={openMenu === item.label}
											onOpenChange={(isOpen) => setOpenMenu(isOpen ? item.label : "")}
											className="group/collapsible transition-all duration-200 data-[state=open]:bg-[#143593] group-data-[collapsible=icon]:data-[state=open]:bg-transparent"
										>
											<SidebarMenuItem>
												<CollapsibleTrigger asChild>
													<SidebarMenuButton
														isActive={active}
														className={`
															group relative flex h-[46px] w-full items-center gap-3 rounded-none border-none px-6 text-[12px] font-bold tracking-wide text-white transition-all duration-500 ease-in-out
															group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center
															hover:bg-[#09267B] hover:text-white cursor-pointer
															group-data-[state=open]/collapsible:shadow-[inset_4px_0_0_0_white]
															data-[active=true]:text-white data-[active=true]:shadow-[inset_4px_0_0_0_white]
															group-data-[state=closed]/collapsible:data-[active=true]:bg-[#09267B]
															group-data-[collapsible=icon]:data-[active=true]:bg-[#09267B]
														`}
													>
														<Icon className="size-[20px] shrink-0 transition-all duration-500 ease-in-out group-data-[collapsible=icon]:size-[26px]" strokeWidth={2.5} />
														<span className="text-[12px] font-bold tracking-wide text-white truncate transition-all duration-500 ease-in-out overflow-hidden group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0">
															{item.label}
														</span>
													</SidebarMenuButton>
												</CollapsibleTrigger>
												<CollapsibleContent className="overflow-hidden data-[state=closed]:animate-[collapsible-up_0.2s_ease-out] data-[state=open]:animate-[collapsible-down_0.2s_ease-out]">
													<SidebarMenuSub className="m-0 p-0 gap-0 border-none space-y-0 flex-col">
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
																						group relative flex h-10 w-full items-center gap-3 rounded-none border-none pl-[44px] pr-6 text-[12px] font-bold tracking-wide text-white transition-all duration-200
																						hover:bg-[#09267B] hover:text-white cursor-pointer
																						shadow-[inset_4px_0_0_0_white]
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
																										group relative flex h-10 w-full items-center gap-3 rounded-none border-none pl-[64px] pr-6 text-[12px] font-bold tracking-wide text-white transition-all duration-200
																										hover:bg-[#09267B] hover:text-white
																										shadow-[inset_4px_0_0_0_white]
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
																				group relative flex h-10 w-full items-center gap-3 rounded-none border-none pl-[44px] pr-6 text-[12px] font-bold tracking-wide text-white transition-all duration-200
																				hover:bg-[#09267B] hover:text-white
																				shadow-[inset_4px_0_0_0_white]
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
												group relative flex h-[46px] w-full items-center gap-3 rounded-none border-none px-6 text-[12px] font-bold tracking-wide text-white transition-all duration-500 ease-in-out
												group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center
												hover:bg-[#09267B] hover:text-white
												data-[active=true]:bg-[#09267B] data-[active=true]:text-white data-[active=true]:shadow-none
											`}
										>
											<Link href={item.path!}>
												<Icon className="size-[20px] shrink-0 transition-all duration-500 ease-in-out group-data-[collapsible=icon]:size-[26px]" strokeWidth={2.5} />
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
					<div className="flex w-[236px] items-center gap-3 px-2 py-2 text-left text-white transition-all duration-500 ease-in-out group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:invisible">
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
							<p className="text-[11px] font-bold tracking-wide text-white truncate text-white/90">
								Administrador Web
							</p>
						</div>
						<DropdownMenu modal={false} open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
							<DropdownMenuTrigger asChild>
								<button
									type="button"
									className="rounded-md p-1.5 transition-colors hover:bg-white/10 focus:outline-none"
								>
									<MoreVertical className="size-4 shrink-0 text-white" strokeWidth={2.5} />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								align="end"
								sideOffset={8}
								className={`w-44 bg-white text-black border-gray-200 p-1 ${!isHovered ? "hidden" : ""}`}
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
							>
								<DropdownMenuItem className="text-[12px] font-bold px-3 py-1.5 transition-all duration-200 hover:pl-4 focus:pl-4 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer text-black">
									<CircleUserRound className="mr-2 size-3.5 text-black" strokeWidth={2.5} />
									Mi Perfil
								</DropdownMenuItem>
								<DropdownMenuItem className="text-[12px] font-bold px-3 py-1.5 transition-all duration-200 hover:pl-4 focus:pl-4 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer text-black">
									<Landmark className="mr-2 size-3.5 text-black" strokeWidth={2.5} />
									Mi Empresa
								</DropdownMenuItem>
								<DropdownMenuItem className="text-[12px] font-bold px-3 py-1.5 transition-all duration-200 hover:pl-4 focus:pl-4 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer text-black">
									<Settings2 className="mr-2 size-3.5 text-black" strokeWidth={2.5} />
									Configuración
								</DropdownMenuItem>
								<DropdownMenuItem className="text-[12px] font-bold px-3 py-1.5 transition-all duration-200 hover:pl-4 focus:pl-4 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer text-black">
									<LogOut className="mr-2 size-3.5 text-black" strokeWidth={2.5} />
									Cerrar Sesión
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</SidebarFooter>
			</Sidebar>
			{children && (
				<SidebarInset>
					{children}
				</SidebarInset>
			)}
		</SidebarProvider>
	)
}
