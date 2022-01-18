<script>
    import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

    import { Swiper, SwiperSlide } from "swiper/svelte";

    // Import Swiper styles
    import "swiper/css";
    import "swiper/css/navigation";
    import "swiper/css/pagination";
    import "swiper/css/scrollbar";
</script>

<div class="mainContent ">
    <div class="dashboardWrappersup">
        <div class="dashboardSection w-2/3 xs:w-full sm:w-full">
            <div class="breadcrumbSup">
                <div
                    class="breadcrumb-section flex justify-between items-center xs:px-3 xs:mt-3"
                >
                    <p class="pt-p7px pb-5">
                        <span class=" pr-1 text-font32 font-medium xs:text-2xl"
                            >Support</span
                        >
                    </p>
                </div>
            </div>

            <div class="myactionitems">
                <div class="headingMyactions mb-4">
                    <h1 class="cardhead leading-9">Tutorials</h1>
                    <p class="cardDes leading-8">
                        Learn process by video tutorials
                    </p>
                </div>

                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={3}
                    pagination={{ clickable: true }}
                    on:slideChange={() => console.log("slide change")}
                    on:swiper={(e) => console.log(e.detail[0])}
                >
                    <SwiperSlide>
                        <img
                            class="object-cover w-full h-36"
                            src="../src/img/videotutorials.svg"
                            alt="apple watch photo"
                        />
                        <p class="text-lg font-normal leading-9">
                            New Onboarding
                        </p></SwiperSlide
                    >
                    <SwiperSlide>
                        <img
                            class="object-cover w-full h-36"
                            src="../src/img/videotutorials.svg"
                            alt="apple watch photo"
                        />
                        <p class="text-lg font-normal leading-9">
                            Planned Work Order
                        </p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            class="object-cover w-full h-36"
                            src="../src/img/videotutorials.svg"
                            alt="apple watch photo"
                        />
                        <p class="text-lg font-normal leading-9">
                            Adhoc Work Order
                        </p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            class="object-cover w-full h-36"
                            src="../src/img/videotutorials.svg"
                            alt="apple watch photo"
                        />
                        <p class="text-lg font-normal leading-9">Supplier</p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            class="object-cover w-full h-36"
                            src="../src/img/videotutorials.svg"
                            alt="apple watch photo"
                        />
                        <p class="text-lg font-normal leading-9">Downloads</p>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
        <div class="activeProfile w-1/3  xs:w-full sm:w-full">
            <div class="myactionitems ">
                <div class="headingMyactions mb-4">
                    <h1 class="cardhead mb-2">NivaRun Support</h1>
                    <p class="cardDes">Create tickets for any queries</p>
                </div>

                <div class="emailIdSection mb-3">
                    <p class="titleSup ">
                        For vendor management support send email to:
                    </p>
                    <div class="emailsup  ">
                        <img
                            src="../src/img/emailsup.svg"
                            class="pr-pr14px"
                            alt=""
                        />
                        <span class="text-blackshade"
                            >vmt.support@elastic.run</span
                        >
                    </div>
                </div>
                <div class="emailIdSection mb-3">
                    <p class="titleSup ">For tech support send email to:</p>
                    <div class="emailsup  ">
                        <img
                            src="../src/img/emailsup.svg"
                            class="pr-pr14px"
                            alt=""
                        />
                        <span class="text-blackshade"
                            >tech.support@elastic.run</span
                        >
                    </div>
                </div>
                <div class="emailIdSection mb-3">
                    <p class="titleSup ">For finance support send email to:</p>
                    <div class="emailsup  ">
                        <img
                            src="../src/img/emailsup.svg"
                            class="pr-pr14px"
                            alt=""
                        />
                        <span class="text-blackshade"
                            >finance.support@elastic.run</span
                        >
                    </div>
                </div>
                <div class="emailIdSection mb-3">
                    <p class="titleSup ">For finance support send email to:</p>
                    <div class="emailsup  ">
                        <img
                            src="../src/img/emailsup.svg"
                            class="pr-pr14px"
                            alt=""
                        />
                        <span class="text-blackshade"
                            >finance.support@elastic.run</span
                        >
                    </div>
                </div>
                <div class="emailIdSection mb-3">
                    <p class="titleSup ">For finance support send email to:</p>
                    <div class="emailsup  ">
                        <img
                            src="../src/img/emailsup.svg"
                            class="pr-pr14px"
                            alt=""
                        />
                        <span class="text-blackshade"
                            >finance.support@elastic.run</span
                        >
                    </div>
                </div>
                <div class="emailIdSection mb-3">
                    <p class="titleSup ">For finance support send email to:</p>
                    <div class="emailsuplast  ">
                        <img
                            src="../src/img/emailsup.svg"
                            class="pr-pr14px"
                            alt=""
                        />
                        <span class="text-blackshade"
                            >finance.support@elastic.run</span
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
